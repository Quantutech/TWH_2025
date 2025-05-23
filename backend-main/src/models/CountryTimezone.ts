import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Country from './Country';

@Table({ tableName: 'country_timezones' })
export default class CountryTimezone extends Model {
    @ForeignKey(() => Country)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    countryId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    gmtOffset!: number;
}
