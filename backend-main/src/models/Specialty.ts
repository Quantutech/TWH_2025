import { BelongsToMany, Column, DataType, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Provider from './Provider';
import ProviderSpeciality from './ProviderSpeciality';

@DBModel('specialities')
export default class Specialty extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Provider, () => ProviderSpeciality)
  providers!: Provider[];
}
