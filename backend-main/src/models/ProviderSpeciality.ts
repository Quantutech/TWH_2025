import DBModel from '../decorators/model';
import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import Provider from './Provider';
import Specialty from './Specialty';

@DBModel('provider_specialities')
export default class ProviderSpeciality extends Model {
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  providerId!: number;

  @ForeignKey(() => Specialty)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  specialtyId!: number;
}
