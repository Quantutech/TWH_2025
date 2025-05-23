import { Column, DataType, HasMany, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import State from './State';
import CountryTimezone from './CountryTimezone';

@DBModel('countries')
export default class Country extends Model {
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    name!: string;

    @HasMany(() => State)
    states!: State[];

    @HasMany(() => CountryTimezone)
    timezones!: CountryTimezone[];
}
