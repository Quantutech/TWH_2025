import { NextFunction, Request, Response } from 'express';

interface SuccessResponse<T> {
  success: boolean;
  data: T;
}

export function responseInterceptor<T>(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json.bind(res);
  res.json = (data: T) => {
    if (res.statusCode === 200) {
      const responseBody: SuccessResponse<T> = {
        success: true,
        data,
      };

      return originalJson(responseBody);
    }

    return originalJson(data);
  };

  next();
}
