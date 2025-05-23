import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SourceType } from '../types/common-types';

export const Validator = <T extends object>(
  DtoClass: new () => T,
  source = SourceType.Body
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = new DtoClass();
    Object.assign(dtoInstance, req[source]);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const validationErrors = errors.map((error) => {
        return {
          property: error.property,
          messages: Object.values(error.constraints as object),
        };
      });

      res.status(400).json({
        errors: validationErrors,
      });
    } else {
      req[source] = dtoInstance;
      next();
    }
  };
};
