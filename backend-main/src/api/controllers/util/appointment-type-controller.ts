import { Request } from 'express';
import Inject from '../../../decorators/inject';
import {
    InternalServerError,
} from '../../../errors/custom-errors';
import AppointmentTypeService from '../../../services/util/appointment-type-service';
import Controller from '../../decorators/controller';
import Get from '../../decorators/get';
import BaseController from '../abstracts/base-controller';

@Controller('/util/appointment-types')
export default class UtilAppointmentTypeController extends BaseController {
    constructor(@Inject() private readonly service: AppointmentTypeService) {
        super();
    }

    @Get('/')
    public async getAllAppointmentTypes(req: Request, res: Response) {
        try {
            return await this.service.getAll();
        } catch (error) {
            throw new InternalServerError((error as Error).message);
        }
    }
}
