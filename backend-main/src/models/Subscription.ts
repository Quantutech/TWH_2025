import { Column, DataType, HasMany, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import ProviderSubscription from './ProviderSubscription';

@DBModel('subscriptions')
export default class Subscription extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  appointmentSlotsLimit?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  digitalProductLimit?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  analyticsAccessLevel?: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  calendarIntegration!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  prioritySupport!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  galleryEnabled!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  videoIntroEnabled!: boolean;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 30,
  })
  durationDays!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripePriceId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeProductId!: string;

  @HasMany(() => ProviderSubscription)
  providerSubscriptions!: ProviderSubscription[];
}
