import {
  Column,
  DataType,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Provider from './Provider';
import ProviderLanguage from './ProviderLanguage';

@DBModel('languages')
export default class Language extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Provider, () => ProviderLanguage)
  providers!: Provider[];
}
