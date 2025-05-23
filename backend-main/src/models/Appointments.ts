import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import { AppointmentStatus } from '../types/common-types';
import AppointmentType from './AppointmentType';
import Client from './Client';
import Insurance from './Insurance';
import Provider from './Provider';

@DBModel('appointments')
export default class Appointment extends Model {
  @ForeignKey(() => Provider)
  @Column({ type: DataType.INTEGER, allowNull: false })
  providerId!: number;

  @BelongsTo(() => Provider)
  provider!: Provider;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER, allowNull: false })
  clientId!: number;

  @BelongsTo(() => Client)
  client!: Client;

  @Column({ type: DataType.DATE, allowNull: false })
  slotTime!: Date;

  @Column({
    type: DataType.ENUM(
      AppointmentStatus.Confirmed,
      AppointmentStatus.Cancelled,
      AppointmentStatus.Approved,
    ),
    allowNull: false,
    defaultValue: AppointmentStatus.Confirmed,
  })
  status!: AppointmentStatus;

  @Column({ type: DataType.STRING(200), allowNull: false })
  reason?: string;

  @ForeignKey(() => Insurance)
  @Column({ type: DataType.INTEGER, allowNull: true })
  insuranceId!: number;

  @BelongsTo(() => Insurance)
  insurance!: Insurance;

  @ForeignKey(() => AppointmentType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  appointmentTypeId!: number;

  @BelongsTo(() => AppointmentType)
  appointmentType!: AppointmentType;
}
