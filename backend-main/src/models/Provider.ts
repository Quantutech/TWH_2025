import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Address from './Address';
import Appointment from './Appointments';
import AppointmentType from './AppointmentType';
import Evaluate from './Evaluate';
import Insurance from './Insurance';
import Language from './Language';
import ProviderAppointmentType from './ProviderAppointmentType';
import ProviderAvailability from './ProviderAvailabilities';
import ProviderInsurance from './ProviderInsurance';
import ProviderLanguage from './ProviderLanguage';
import ProviderSpeciality from './ProviderSpeciality';
import ProviderSubscription from './ProviderSubscription';
import Specialty from './Specialty';

@DBModel('providers')
export default class Provider extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  middleName?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  profileImageUrl!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  profileSlug?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  professionalTitle?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  licenseNumber?: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  licenseState?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  yearsExperience?: number;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  education?: string;

  @Column({
    type: DataType.STRING(5000),
    allowNull: true,
  })
  bio?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  youtubeUrl?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  facebookUrl?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  instagramUrl?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  xUrl?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  galleryEnabled?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  videoIntroUrl?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  slidingScale?: boolean;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  minFee?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  maxFee?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  isEmailVerified?: boolean;

  @Column({
    type: DataType.ENUM('male', 'female', 'other'),
    allowNull: true,
  })
  gender?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isProfileComplete?: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeCustomerId!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isActiveSubscription!: boolean

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  verificationCode?: string;

  @Column({
    type: DataType.ENUM('external', 'our_system'),
    allowNull: true,
  })
  appointmentCalendarType?: 'external' | 'our_system';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  externalAppointmentUrl?: string

  @HasOne(() => Address)
  address!: Address;

  @HasMany(() => Evaluate)
  ratings!: Evaluate[];

  @HasOne(() => ProviderSubscription)
  providerSubscription!: ProviderSubscription;

  @HasMany(() => ProviderAvailability)
  providerAvailability!: ProviderAvailability;

  @HasMany(() => Appointment)
  appointments!: Appointment[];

  @BelongsToMany(() => Language, () => ProviderLanguage)
  languages!: Language[];

  @BelongsToMany(() => Specialty, () => ProviderSpeciality)
  specialities!: Specialty[];

  @BelongsToMany(() => Insurance, () => ProviderInsurance)
  insurances!: Insurance[];

  @BelongsToMany(() => AppointmentType, () => ProviderAppointmentType)
  appointmentType!: AppointmentType[];
}
