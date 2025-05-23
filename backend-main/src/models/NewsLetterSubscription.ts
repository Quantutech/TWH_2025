import { Column, DataType, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';

@DBModel('newsletter_subscriptions')
export default class NewsLetterSubscription extends Model {
  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  email!: string;
}
