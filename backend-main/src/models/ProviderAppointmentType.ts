import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import AppointmentType from './AppointmentType';
import Provider from './Provider';

@DBModel('provider_appointment_types')
export default class ProviderAppointmentType extends Model {
    @ForeignKey(() => Provider)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    providerId!: number;

    @BelongsTo(() => Provider)
    provider!: Provider;

    @ForeignKey(() => AppointmentType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    appointmentTypeId!: number;

    @BelongsTo(() => AppointmentType)
    appointmenType!: AppointmentType;
}
