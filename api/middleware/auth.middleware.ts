import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import type { RequestType, UserPayload } from "../types/RequestType";
import env from "../config/env";
import { HTTPError } from "../middleware/error.middleware";

const isAuthenticated = (
	req: RequestType,
	res: Response,
	next: NextFunction
): void => {
	try {
		const token = req.cookies?.auth_token;
		if (!token) {
			throw new HTTPError("No authentication token found", 401);
		}

		const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;

		req.user = decoded;
		next();
	} catch (error: any) {
		next(new HTTPError("Invalid or expired authentication token", 401));
	}
};

export default isAuthenticated;
