import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Provider from './Provider';
import Subscription from './Subscription';

@DBModel('provider_subscriptions')
export default class ProviderSubscription extends Model {
  @ForeignKey(() => Provider)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  providerId!: number;

  @ForeignKey(() => Subscription)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subscriptionId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeSubscriptionId!: string;
}
