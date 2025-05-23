import { Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Insurance from './Insurance';
import Provider from './Provider';

@DBModel('provider_insurances')
export default class ProviderInsurance extends Model {
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  providerId!: number;

  @ForeignKey(() => Insurance)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  insuranceId!: number;
}
