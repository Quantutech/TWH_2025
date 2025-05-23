import { FindOptions } from 'sequelize';
import Repository from '../decorators/repository';
import { ProviderListDTO } from '../dtos/provider/provider-list.dto';
import Provider from '../models/Provider';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';

@Repository(Provider)
export default class ProviderRepository extends BaseRepository<Provider> {
  public async getPaginatedList(
    request: ProviderListDTO
  ): Promise<PaginatedResult<Provider>> {
    const {
      limit = 20,
      page = 1,
      keyword,
      languages,
      specialities,
      dayOfWeek,
      insurances,
      state,
      gender,
      sort,
      lat,
      long,
      appointmentType
    } = request;

    const isNumericKeyword = /^\d+$/.test(keyword || "");
    const buildWhereClause = () => {
      const whereClauseParts: string[] = [];

      if (keyword) {
        let whereClause = isNumericKeyword
          ? 'p.id = :keyword'
          : `(p.first_name ILIKE  :keyword OR p.last_name ILIKE  :keyword OR p.email ILIKE  :keyword OR p.professional_title ILIKE  :keyword)`;
        whereClauseParts.push(whereClause);
      }
      whereClauseParts.push('p.is_profile_complete = true');
      whereClauseParts.push('p.is_active_subscription = true');
      if (gender) whereClauseParts.push('p.gender = :gender');
      if (state) whereClauseParts.push('a.state = :state');
      if (languages && languages.length > 0)
        whereClauseParts.push("pl.language_id = ANY (string_to_array(:languages, ',')::int[])");
      if (specialities && specialities.length > 0)
        whereClauseParts.push("ps.specialty_id = ANY (string_to_array(:specialities, ',')::int[])");
      if (insurances && insurances.length > 0)
        whereClauseParts.push("pi.insurance_id = ANY (string_to_array(:insurances, ',')::int[])");
      if (appointmentType)
        whereClauseParts.push('ap.type = :appointmentType');
      if (dayOfWeek)
        whereClauseParts.push('pa.day_of_week = :dayOfWeek');

      return whereClauseParts.length > 0
        ? 'WHERE ' + whereClauseParts.join(' AND ')
        : '';
    };

    const orderByClause = (() => {
      switch (Number(sort)) {
        case 0: return 'ORDER BY p.first_name ASC';
        case 1: return 'ORDER BY p.first_name DESC';
        case 2: return 'ORDER BY rate ASC';
        case 3: return 'ORDER BY rate DESC';
        case 4: return lat !== undefined && long !== undefined ? 'ORDER BY distance ASC' : '';
        case 5: return lat !== undefined && long !== undefined ? 'ORDER BY distance DESC' : '';
        case 6: return 'ORDER BY approvedappointmentscount ASC';
        case 7: return 'ORDER BY approvedappointmentscount DESC';
        default: return 'ORDER BY p.first_name ASC';
      }
    })();

    const query = `
      SELECT
        p.id AS "id",
        p.first_name AS "firstName",
        p.middle_name AS "middleName",
        p.last_name AS "lastName",
        p.email AS "email",
        p.profile_slug AS "profileSlug",
        p.profile_image_url AS "profileImageUrl",
        p.professional_title AS "professionalTitle",
        p.gender AS "gender",
        a.country AS "country",
        a.state AS "state",
        a.city AS "city",
        a.zip_code AS "zipCode",
        a.street_address AS "streetAddress",
        (SELECT ROUND(AVG(r.rating), 2) FROM evaluates r WHERE r.provider_id = p.id) AS "rate",
        (SELECT COUNT(*) FROM evaluates r WHERE r.provider_id = p.id) AS "reviewCount",
        (SELECT COUNT(*) FROM appointments app WHERE app.provider_id = p.id AND app.status = 'approved') AS "approvedappointmentscount",
        ${lat !== undefined && long !== undefined
        ? 'ST_Distance(ST_MakePoint(a.long, a.lat)::geometry, ST_MakePoint(:long, :lat)::geometry) AS "distance",'
        : ''
      }
  
        (
          SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('id', l.id, 'name', l.name))
          FROM provider_languages pl2
          JOIN languages l ON pl2.language_id = l.id
          WHERE pl2.provider_id = p.id
        ) AS "languages",
  
        (
          SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('id', s.id, 'name', s.name))
          FROM provider_specialities ps2
          JOIN specialities s ON ps2.specialty_id = s.id
          WHERE ps2.provider_id = p.id
        ) AS "specialities",
  
        (
          SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('id', i.id, 'name', i.name))
          FROM provider_insurances pi2
          JOIN insurances i ON pi2.insurance_id = i.id
          WHERE pi2.provider_id = p.id
        ) AS "insurances",
  
        (
          SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('id', ap.id, 'name', ap.name))
          FROM provider_appointment_types pat2
          JOIN appointment_types ap ON pat2.appointment_type_id = ap.id
          WHERE pat2.provider_id = p.id
        ) AS "appointmentTypes",
  
        (
          SELECT JSON_AGG(DISTINCT JSONB_BUILD_OBJECT(
            'id', pa.id,
            'dayOfWeek', pa.day_of_week,
            'startTime', pa.start_time,
            'endTime', pa.end_time
          ))
          FROM provider_availabilities pa
          WHERE pa.provider_id = p.id
        ) AS "providerAvailability"
  
      FROM providers AS p
      LEFT JOIN addresses AS a ON p.id = a.provider_id
      LEFT JOIN provider_languages AS pl ON p.id = pl.provider_id
      LEFT JOIN provider_specialities AS ps ON p.id = ps.provider_id
      LEFT JOIN provider_insurances AS pi ON p.id = pi.provider_id
      LEFT JOIN provider_appointment_types AS pat ON p.id = pat.provider_id
      LEFT JOIN appointment_types AS ap ON pat.appointment_type_id = ap.id
      LEFT JOIN provider_availabilities AS pa ON p.id = pa.provider_id
      ${buildWhereClause()}
      GROUP BY p.id, a.state, a.city, a.zip_code, a.street_address, a.country, a.long, a.lat
      ${orderByClause}
    `;

    const countQuery = `
      SELECT COUNT(DISTINCT p.id) AS totalCount
      FROM providers AS p
      LEFT JOIN addresses AS a ON p.id = a.provider_id
      LEFT JOIN provider_languages AS pl ON p.id = pl.provider_id
      LEFT JOIN provider_specialities AS ps ON p.id = ps.provider_id
      LEFT JOIN provider_insurances AS pi ON p.id = pi.provider_id
      LEFT JOIN provider_appointment_types AS pat ON p.id = pat.provider_id
      LEFT JOIN appointment_types AS ap ON pat.appointment_type_id = ap.id
      LEFT JOIN provider_availabilities AS pa ON p.id = pa.provider_id
      ${buildWhereClause()}
    `;

    const replacements: { [key: string]: any } = {};
    if (keyword) replacements.keyword = isNumericKeyword ? keyword : `%${keyword}%`;
    if (gender) replacements.gender = gender;
    if (state) replacements.state = state;
    if (languages) replacements.languages = languages;
    if (specialities) replacements.specialities = specialities;
    if (insurances) replacements.insurances = insurances;
    if (appointmentType) replacements.appointmentType = appointmentType;
    if (dayOfWeek) replacements.dayOfWeek = dayOfWeek;
    if (lat !== undefined && long !== undefined) {
      replacements.lat = lat;
      replacements.long = long;
    }

    return this.sqlQueryPaginate<Provider>(query, countQuery, page, limit, replacements);
  }

  public async getPaginatedListWithoutQuery(
    page = 1,
    limit = 50
  ): Promise<PaginatedResult<Provider>> {
    const options: FindOptions<Provider> = {
      order: [['createdAt', 'DESC']],
    };

    return this.paginate(options, page, limit);
  }

  public async findByEmail(email: string): Promise<Provider | null> {
    return this.model.findOne({ where: { email } });
  }

  public async updatePasswordByEmail(email: string, password: string) {
    return this.model.update({ password }, { where: { email } });
  }

  public async updatePasswordById(id: number, password: string) {
    return this.model.update({ password }, { where: { id } });
  }

  public async updateEmailVerified(email: string) {
    return this.model.update({ isEmailVerified: true }, { where: { email } });
  }

  public async findById(id: number): Promise<Provider | null> {
    return this.model.findOne({ where: { id } });
  }
}
