import { NextFunction, Request, RequestHandler, Response } from "express";

type Observer = (message: Message) => void;

type ObserverWithName = {
	name: string;
	notify: Observer;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Prototype = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Target = any;

type WebRoute = {
	[key: string]: (
		request: Request,
		response: Response,
		next: NextFunction,
	) => Promise<unknown>;
};

interface IPrototype {
	prototype: Prototype;
}

interface Error {
	name: string;
	message: string;
	stack?: string;
	statusCode: number;
}

type Route = {
	path: string;
	method: string;
	methodName: string;
	target: Target;
	preMiddlewares: RequestHandler[];
	postMiddlewares: RequestHandler[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Target = any;

interface IDecodedJwt {
	userId: number;
	userSlug: string;
	role: "client" | "provider" | "admin";
	isSuper?: bool;
	isEmailVerified?: boolean;
	email?: string;
	iat?: number;
	exp?: number;
}

export interface IRequestWithUser extends Request {
	user: {
		userId: number;
		profileSlug: string;
		isSuper?: bool;
	};
}
