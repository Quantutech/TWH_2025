import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import State from './State';

@DBModel('cities')
export default class City extends Model {
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    name!: string;

    @ForeignKey(() => State)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    stateId!: number;

    @BelongsTo(() => State)
    state!: State;
}
