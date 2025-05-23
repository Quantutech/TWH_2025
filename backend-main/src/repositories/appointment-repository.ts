import { FindOptions, Op, WhereOptions } from 'sequelize';
import Repository from '../decorators/repository';
import { AppointmentListDTO } from '../dtos/appointment/appointment-list.dto';
import Appointment from '../models/Appointments';
import AppointmentType from '../models/AppointmentType';
import Client from '../models/Client';
import Insurance from '../models/Insurance';
import { AppointmentStatus } from '../types/common-types';
import BaseRepository, { PaginatedResult } from './abstracts/base-repository';

@Repository(Appointment)
export default class AppointmentRepositoy extends BaseRepository<Appointment> {
    public async getPaginatedList(
        request: AppointmentListDTO
    ): Promise<PaginatedResult<Appointment>> {
        const { limit, page = 1, keyword, providerId, status } = request;

        const whereConditions: WhereOptions[] = [];

        if (providerId) {
            whereConditions.push({ providerId });
        }

        if (status) {
            if (status === AppointmentStatus.Past) {
                whereConditions.push({
                    status: {
                        [Op.or]: [
                            AppointmentStatus.Confirmed,
                            AppointmentStatus.Approved,
                        ],
                    },
                    slot_time: { [Op.lt]: new Date() },
                });
            } else {
                whereConditions.push({ status });
            }
        }

        if (keyword) {
            whereConditions.push({
                [Op.or]: [
                    { '$client.first_name$': { [Op.iLike]: `%${keyword}%` } },
                    { '$client.last_name$': { [Op.iLike]: `%${keyword}%` } },
                    { '$client.email$': { [Op.iLike]: `%${keyword}%` } },
                ],
            });
        }

        const whereClause: WhereOptions = whereConditions.length ? { [Op.and]: whereConditions } : {};

        const options: FindOptions<Appointment> = {
            where: whereClause,
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['id', 'firstName', 'middleName', 'lastName', 'email']
                },
                {
                    model: Insurance,
                    attributes: ['id', 'name']
                },
                {
                    model: AppointmentType,
                    attributes: ['id', 'name', "type"]
                },
            ],
            subQuery: false,
            order: [['createdAt', 'DESC']],
        };

        return this.paginate(options, page, limit);
    }
}
