import Repository from '../decorators/repository';
import AppointmentType from '../models/AppointmentType';
import BaseRepository from './abstracts/base-repository';

@Repository(AppointmentType)
export default class AppointmentTypeRepository extends BaseRepository<AppointmentType> {

}
