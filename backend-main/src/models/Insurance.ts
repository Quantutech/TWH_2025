import { BelongsToMany, Column, DataType, HasMany, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Appointment from './Appointments';
import Provider from './Provider';
import ProviderInsurance from './ProviderInsurance';

@DBModel('insurances')
export default class Insurance extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Provider, () => ProviderInsurance)
  providers!: Provider[];

  @HasMany(() => Appointment)
  appointments!: Appointment[];
}
