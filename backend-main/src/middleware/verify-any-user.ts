import { NextFunction, Request, Response } from "express";
import container from "../configs/inversify-config";
import { UnauthorizedError } from "../errors/custom-errors";
import { extractTokenFromHeader } from "../helpers";
import JwtService from "../services/jwt-service";
import { IRequestWithUser } from "../types/types";

export const VerifyAnyUser = () => {
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

		const jwtService = container.get(JwtService);
		const user = (req as unknown as IRequestWithUser).user || {};
		let decoded;
		try {
			decoded = jwtService.verifyClientJwt(bearerToken);
			user.userId = decoded.userId;
			user.profileSlug = decoded.userSlug;
		} catch (errClient) {
			try {
				decoded = jwtService.verifyAdminJwt(bearerToken);
				user.userId = decoded.userId;
				user.profileSlug = decoded.userSlug;
			} catch (errAdmin) {
				try {
					decoded = jwtService.verifyProviderJwt(bearerToken);
					user.userId = decoded.userId;
					user.profileSlug = decoded.userSlug;
				} catch (errProvider) {
					return next(
						new UnauthorizedError("Invalid or expired authorization token."),
					);
				}
			}
		}

		if (!decoded.isEmailVerified) {
			return next(
				new UnauthorizedError("Authorization token is missing or invalid."),
			);
		}

		(req as unknown as IRequestWithUser).user = user;
		next();
	};
};
