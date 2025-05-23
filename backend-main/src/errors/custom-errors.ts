import HTTPStatuses from '../consts/http-statuses';
import HTTPError from './http-error';

export class CustomError extends HTTPError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export class BadRequestError extends HTTPError {
  constructor(message?: string) {
    super(message ?? 'Bad Request', HTTPStatuses.BAD_REQUEST);
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(message?: string) {
    super(message ?? 'Unauthorized', HTTPStatuses.UNAUTHORIZED);
  }
}

export class NotFoundError extends HTTPError {
  constructor(message?: string) {
    super(message ?? 'Not Found', HTTPStatuses.NOT_FOUND);
  }
}

export class InternalServerError extends HTTPError {
  constructor(message?: string) {
    super(
      message ?? 'Internal Server Error',
      HTTPStatuses.INTERNAL_SERVER_ERROR
    );
  }
}

export class ForbiddenError extends HTTPError {
  constructor(message?: string) {
    super(message ?? 'Forbidden', HTTPStatuses.FORBIDDEN);
  }
}
