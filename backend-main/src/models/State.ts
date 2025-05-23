import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import City from './City';
import Country from './Country';

@DBModel('states')
export default class State extends Model {
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    name!: string;

    @ForeignKey(() => Country)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    countryId!: number;

    @BelongsTo(() => Country)
    country!: Country;

    @HasMany(() => City)
    cities!: City[];
}
