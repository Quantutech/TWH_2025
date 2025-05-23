import Repository from '../decorators/repository';
import ProviderAppointmentType from '../models/ProviderAppointmentType';
import BaseRepository from './abstracts/base-repository';

@Repository(ProviderAppointmentType)
export default class ProviderAppointmentTypeRepository extends BaseRepository<ProviderAppointmentType> {
}
