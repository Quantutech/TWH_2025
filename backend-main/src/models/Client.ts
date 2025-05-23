import { Column, DataType, HasOne, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Address from './Address';

@DBModel('clients')
export default class Client extends Model {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  password!: string;

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
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate?: Date;

  @Column({
    type: DataType.ENUM('male', 'female', 'other'),
    allowNull: true,
  })
  gender?: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  socialSecurityNumber?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  profileImageUrl?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  profileSlug?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  isEmailVerified?: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  verificationCode?: string;

  @HasOne(() => Address)
  address!: Address;
}
