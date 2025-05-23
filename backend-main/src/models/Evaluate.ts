import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Provider from './Provider';
import Client from './Client';

@DBModel('evaluates')
export default class Evaluate extends Model {
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  providerId!: number;

  @BelongsTo(() => Provider)
  provider!: Provider;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId!: number;

  @BelongsTo(() => Client)
  client!: Client;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  })
  rating!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  suggestion!: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 2 },
  })
  waitingTime!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;
}
