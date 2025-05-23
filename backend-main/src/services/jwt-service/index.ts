import jwt from "jsonwebtoken";
import JwtConfigs from "../../configs/jwt-config";
import Service from "../../decorators/service";
import { NotFoundError } from "../../errors/custom-errors";
import { IDecodedJwt } from "../../types/types";

@Service()
export default class JwtService {
	private readonly clientJwtSecret: string = JwtConfigs.clientJwtSecret;
	private readonly providerJwtSecret: string = JwtConfigs.providerJwtSecret;
	private readonly adminJwtSecret: string = JwtConfigs.adminJwtSecret;
	private readonly clientJwtExpiry: string = JwtConfigs.clientJwtExpiry;
	private readonly providerJwtExpiry: string = JwtConfigs.providerJwtExpiry;
	private readonly adminJwtExpiry: string = JwtConfigs.adminJwtExpiry;
	private readonly clientRefreshTokenExpiry: string =
		JwtConfigs.clientRefreshTokenExpiry;
	private readonly clientRefreshTokenSecret: string =
		JwtConfigs.clientRefreshTokenSecret;
	private readonly providerRefreshTokenExpiry: string =
		JwtConfigs.providerRefreshTokenExpiry;
	private readonly providerRefreshTokenSecret: string =
		JwtConfigs.providerRefreshTokenSecret;
	private readonly adminRefreshTokenExpiry: string =
		JwtConfigs.adminRefreshTokenExpiry;
	private readonly adminRefreshTokenSecret: string =
		JwtConfigs.adminRefreshTokenSecret;

	public generateClientJwt(payload: object, expiresTime?: string): string {
		const fullPayload = { ...payload, role: "client" };
		return jwt.sign(fullPayload, this.clientJwtSecret, {
			expiresIn: expiresTime || this.clientJwtExpiry,
		});
	}

	public generateProviderJwt(payload: object, expiresTime?: string): string {
		const fullPayload = { ...payload, role: "provider" };
		return jwt.sign(fullPayload, this.providerJwtSecret, {
			expiresIn: expiresTime || this.providerJwtExpiry,
		});
	}

	public generateAdminJwt(payload: object): string {
		const fullPayload = { ...payload, role: "admin" };
		return jwt.sign(fullPayload, this.adminJwtSecret, {
			expiresIn: this.adminJwtExpiry,
		});
	}

	public verifyClientJwt(token: string): IDecodedJwt {
		try {
			return jwt.verify(token, this.clientJwtSecret) as IDecodedJwt;
		} catch (error) {
			throw new NotFoundError("Invalid token");
		}
	}

	public verifyProviderJwt(token: string): IDecodedJwt {
		try {
			return jwt.verify(token, this.providerJwtSecret) as IDecodedJwt;
		} catch (error) {
			throw new NotFoundError("Invalid token");
		}
	}

	public verifyAdminJwt(token: string): IDecodedJwt {
		try {
			return jwt.verify(token, this.adminJwtSecret) as IDecodedJwt;
		} catch (error) {
			throw new NotFoundError("Invalid token");
		}
	}

	public generateClientRefreshToken(payload: object): string {
		const fullPayload = { ...payload, role: "client" };
		return jwt.sign(fullPayload, this.clientRefreshTokenSecret, {
			expiresIn: this.clientRefreshTokenExpiry,
		});
	}

	public generateProviderRefreshToken(payload: object): string {
		const fullPayload = { ...payload, role: "provider" };
		return jwt.sign(fullPayload, this.providerRefreshTokenSecret, {
			expiresIn: this.providerRefreshTokenExpiry,
		});
	}

	public generateAdminRefreshToken(payload: object): string {
		const fullPayload = { ...payload, role: "admin" };
		return jwt.sign(fullPayload, this.adminRefreshTokenSecret, {
			expiresIn: this.adminRefreshTokenExpiry,
		});
	}

	public verifyClientRefreshToken(token: string): IDecodedJwt {
		try {
			return jwt.verify(token, this.clientRefreshTokenSecret) as IDecodedJwt;
		} catch (error) {
			throw new NotFoundError("Invalid token");
		}
	}

	public verifyProviderRefreshToken(token: string): IDecodedJwt {
		try {
			return jwt.verify(token, this.providerRefreshTokenSecret) as IDecodedJwt;
		} catch (error) {
			throw new NotFoundError("Invalid token");
		}
	}

	public verifyAdminRefreshToken(token: string): IDecodedJwt {
		try {
			return jwt.verify(token, this.adminRefreshTokenSecret) as IDecodedJwt;
		} catch (error) {
			throw new NotFoundError("Invalid token");
		}
	}
}
