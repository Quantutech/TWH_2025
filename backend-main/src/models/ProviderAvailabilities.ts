import { Column, DataType, ForeignKey, Model, BelongsTo } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Provider from './Provider';
import { DayOfWeekEnum } from '../types/common-types';

@DBModel('provider_availabilities')
export default class ProviderAvailability extends Model {
    @ForeignKey(() => Provider)
    @Column({ type: DataType.INTEGER, allowNull: false })
    providerId!: number;

    @BelongsTo(() => Provider)
    provider!: Provider;

    @Column({
        type: DataType.ENUM(...Object.values(DayOfWeekEnum)),
        allowNull: false
    })
    dayOfWeek!: DayOfWeekEnum;

    @Column({ type: DataType.TIME, allowNull: false })
    startTime!: string;

    @Column({ type: DataType.TIME, allowNull: false })
    endTime!: string;
}