import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
} from 'sequelize-typescript';
import DBModel from '../decorators/model';
import { AppointmentTypeEnum } from '../types/common-types';
import Appointment from './Appointments';
import Provider from './Provider';
import ProviderAppointmentType from './ProviderAppointmentType';

@DBModel('appointment_types')
export default class AppointmentType extends Model {
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.ENUM(AppointmentTypeEnum.Online, AppointmentTypeEnum.InPerson),
        allowNull: false,
        defaultValue: AppointmentTypeEnum.Online,
    })
    type!: AppointmentTypeEnum;

    @BelongsToMany(() => Provider, () => ProviderAppointmentType)
    providers!: Provider[];

    @HasMany(() => Appointment)
    appointments!: Appointment[];
}
