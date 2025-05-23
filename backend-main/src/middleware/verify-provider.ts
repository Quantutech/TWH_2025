import { NextFunction, Request, Response } from "express";
import container from "../configs/inversify-config";
import { UnauthorizedError } from "../errors/custom-errors";
import { extractTokenFromHeader } from "../helpers";
import JwtService from "../services/jwt-service";
import { IRequestWithUser } from "../types/types";

export const VerifyProvider = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers["authorization"];

		if (!authHeader) {
			return next(
				new UnauthorizedError("Authorization token is missing or invalid."),
			);
		}

		const bearerToken = extractTokenFromHeader(authHeader);

		if (!bearerToken) {
			return next(
				new UnauthorizedError("Authorization token is missing or invalid."),
			);
		}

		try {
			const jwtService = container.get(JwtService);
			const decoded = jwtService.verifyProviderJwt(bearerToken);
			if (!decoded.isEmailVerified) {
				return next(
					new UnauthorizedError("Authorization token is missing or invalid."),
				);
			}

			(req as unknown as IRequestWithUser).user =
				(req as unknown as IRequestWithUser).user || {};
			(req as unknown as IRequestWithUser).user.userId = decoded.userId;
			(req as unknown as IRequestWithUser).user.profileSlug = decoded.userSlug;

			next();
		} catch (err) {
			return next(
				new UnauthorizedError("Invalid or expired authorization token."),
			);
		}
	};
};
