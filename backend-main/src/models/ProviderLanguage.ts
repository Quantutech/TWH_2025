import DBModel from '../decorators/model';
import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import Provider from './Provider';
import Language from './Language';

@DBModel('provider_languages')
export default class ProviderLanguage extends Model {
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  providerId!: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  languageId!: number;
}
