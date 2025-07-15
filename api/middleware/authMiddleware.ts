import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import type { RequestType, UserPayload } from "../types/RequestType";
import env from "../config/env";
import { CustomError } from "../types/ErrorType";

const isAuthenticated = (
	req: RequestType,
	res: Response,
	next: NextFunction
): void => {
	try {
		const token = req.cookies?.auth_token;
		if (!token) {
			throw new CustomError("No authentication token found", 401);
		}

		const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;

		req.user = decoded;
		next();
	} catch (error: any) {
		next(new CustomError("Invalid or expired authentication token", 401));
	}
};

export default isAuthenticated;
