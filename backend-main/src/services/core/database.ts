import { readFileSync } from 'fs';
import path from 'path';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import DBConfig from '../../configs/db-config';
import { loadAppointmentTypes, loadLanguages } from '../../configs/util-config';
import WebServerConfigs from '../../configs/web-server-config';
import Inject from '../../decorators/inject';
import Service from '../../decorators/service';
import Logger from './logger';
import { insertAdmin } from '../../utils';

const PostgresDialect: Dialect = 'postgres';

@Service()
export default class DBService {
  private connection!: Sequelize;

  constructor(@Inject() private readonly logger: Logger) {}

  public async connect(): Promise<void> {
    const { name, username, password, port, host } = DBConfig;

    const fileExtension =
      WebServerConfigs.nodeEnv === 'production' ? 'js' : 'ts';
    const modelsPath = path.join(
      __dirname,
      '../../',
      `models/**/*.${fileExtension}`
    );
    try {
      this.connection = new Sequelize({
        database: name,
        dialect: PostgresDialect,
        username,
        password,
        port,
        host,
        logging: false,
        models: [modelsPath],
      });

      await this.connection.authenticate();
      this.logger.info(
        'Database connection has been established successfully.'
      );
    } catch (error) {
      console.error('Error during database connection:', error);
      this.logger.error(`Database connection failed: ${error}`);
      throw new Error(`Database connection failed: ${error}`);
    }
  }

  public async disconnect(): Promise<void> {
    await this.connection.close();
  }

  public getConnection(): Sequelize {
    if (!this.connection) {
      this.connect();
    }
    return this.connection;
  }

  public async sync(): Promise<void> {
    const isFirstTime = !(
      await this.connection.getQueryInterface().showAllTables()
    ).length;

    await this.connection.sync({ alter: false });

    this.logger.info('Database schema synchronized successfully.');

    if (isFirstTime) {
      await this.addIndexes();
      await this.seed();
    }
  }

  private async seed(): Promise<void> {
    try {
      this.logger.info('Seeding database...');
      await insertAdmin();
      const {
        Language,
        AppointmentType,
        City,
        State,
        Country,
        CountryTimezone,
      } = this.connection.models;
      const stateFilePath = path.join(process.cwd(), 'address.json');
      const rawData = JSON.parse(readFileSync(stateFilePath, 'utf-8'));

      const countriesData = rawData.map((country: any) => ({
        id: country.id,
        name: country.name,
      }));

      await Country.bulkCreate(countriesData);
      const statesData = rawData.flatMap((country: any) =>
        country.states.map((state: any) => ({
          id: state.id,
          name: state.name,
          countryId: country.id,
        }))
      );

      const timezonesData = rawData.flatMap((country: any) =>
        (country.timezones || []).map((tz: any) => ({
          countryId: country.id,
          zoneName: tz.zoneName,
          gmtOffset: tz.gmtOffset,
        }))
      );

      await CountryTimezone.bulkCreate(timezonesData);
      await State.bulkCreate(statesData);
      const citiesData = rawData.flatMap((country: any) =>
        country.states.flatMap((state: any) =>
          state.cities.map((city: any) => ({
            id: city.id,
            name: city.name,
            stateId: state.id,
          }))
        )
      );
      await City.bulkCreate(citiesData);

      await Language.bulkCreate(loadLanguages(), {
        ignoreDuplicates: true,
        returning: false,
      });
      await AppointmentType.bulkCreate(loadAppointmentTypes(), {
        ignoreDuplicates: true,
        returning: false,
      });
      this.logger.info('Database seeded successfully.');
    } catch (error) {
      this.logger.error('Failed to seed database:');
      throw error;
    }
  }

  private async addIndexes(): Promise<void> {
    const query = `
      CREATE EXTENSION postgis;
      CREATE EXTENSION IF NOT EXISTS pg_trgm;
      CREATE INDEX idx_providers_first_name_trgm ON providers USING gin (first_name gin_trgm_ops);
      CREATE INDEX idx_providers_last_name_trgm ON providers USING gin (last_name gin_trgm_ops);
      CREATE INDEX idx_providers_email_trgm ON providers USING gin (email gin_trgm_ops);
      CREATE INDEX idx_providers_id ON providers (id);
      CREATE INDEX idx_providers_prof_title_trgm ON providers USING gin (professional_title gin_trgm_ops);
      CREATE INDEX idx_providers_is_profile_complete ON providers (is_profile_complete);
      CREATE INDEX idx_providers_gender ON providers (gender);
      CREATE INDEX idx_addresses_state ON addresses (state);
      CREATE INDEX idx_addresses_lat_long ON addresses (lat, long);
      CREATE INDEX idx_provider_languages_provider_id ON provider_languages (provider_id);
      CREATE INDEX idx_provider_languages_language_id ON provider_languages (language_id);
      CREATE INDEX idx_provider_specialities_provider_id ON provider_specialities (provider_id);
      CREATE INDEX idx_provider_specialities_specialty_id ON provider_specialities (specialty_id);
      CREATE INDEX idx_provider_insurances_provider_id ON provider_insurances (provider_id);
      CREATE INDEX idx_provider_insurances_insurance_id ON provider_insurances (insurance_id);
      CREATE INDEX idx_provider_appointment_types_provider_id ON provider_appointment_types (provider_id);
      CREATE INDEX idx_provider_availabilities_provider_id ON provider_availabilities (provider_id);
      CREATE INDEX idx_provider_availabilities_day_of_week ON provider_availabilities (day_of_week);
      CREATE INDEX idx_appointments_provider_id_status ON appointments (provider_id, status);
      CREATE INDEX idx_evaluates_provider_id ON evaluates (provider_id);
      CREATE INDEX idx_addresses_geom ON addresses USING GIST (ST_MakePoint(long, lat));
      CREATE INDEX idx_addresses_provider_id ON addresses (provider_id);
      `;

    try {
      await this.connection.query(query);
      this.logger.info('Indexes created successfully.');
    } catch (error: any) {
      this.logger.error(error);
    }
  }
}
