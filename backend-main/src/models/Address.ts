import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import DBModel from '../decorators/model';
import Provider from './Provider';
import Client from './Client';

@DBModel('addresses')
export default class Address extends Model {
    @ForeignKey(() => Provider)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: true
    })
    providerId!: number;

    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        unique: true
    })
    clientId!: number;

    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    phoneNumber!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    country!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    state!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    city!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    zipCode!: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: true,
    })
    streetAddress?: string;

    @Column({
        type: DataType.DECIMAL(10, 7),
        allowNull: true,
        validate: {
            min: -90,
            max: 90,
        },
    })
    lat?: number;

    @Column({
        type: DataType.DECIMAL(10, 7),
        allowNull: true,
        validate: {
            min: -180,
            max: 180,
        },
    })
    long?: number;

    @BelongsTo(() => Provider)
    provider!: Provider;

    @BelongsTo(() => Client)
    client!: Client;
}
