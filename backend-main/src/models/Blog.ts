import DBModel from '../decorators/model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import Admin from './Admin';

@DBModel('blogs')
export default class Blog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contextUrl?: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  adminId!: number;

  @BelongsTo(() => Admin)
  admin!: Admin;
}
