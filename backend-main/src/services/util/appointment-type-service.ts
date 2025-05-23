import Service from '../../decorators/service';
import Inject from '../../decorators/inject';
import LanguageModel from '../../models/Language';
import AppointmentTypeRepository from '../../repositories/appointment-type-repository';

@Service()
export default class AppointmentTypeService {
    constructor(
        @Inject() private readonly appointmentTypeRepository: AppointmentTypeRepository
    ) { }

    public async getAll(): Promise<LanguageModel[]> {
        return this.appointmentTypeRepository.findAll();
    }
}
