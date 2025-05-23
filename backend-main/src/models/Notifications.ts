import DBModel from '../decorators/model';
import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import Provider from './Provider';
import Client from './Client';
import { NotificationStatusEnum, NotificationTypeEnum } from '../types/common-types';

@DBModel('notifications')
export default class Notification extends Model {
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  providerId!: number | null;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  clientId!: number | null;

  @Column({
    type: DataType.ENUM(...Object.values(NotificationTypeEnum)),
    allowNull: false,
  })
  type!: NotificationTypeEnum;

  @Column({
    type: DataType.ENUM(...Object.values(NotificationStatusEnum)),
    allowNull: false,
    defaultValue: NotificationStatusEnum.Info,
  })
  status!: NotificationStatusEnum;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  header!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  actionUrl?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isRead!: boolean;

  @BelongsTo(() => Provider)
  provider!: Provider;

  @BelongsTo(() => Client)
  client!: Client;
}

