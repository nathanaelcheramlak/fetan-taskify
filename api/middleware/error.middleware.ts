import { NextFunction, Response } from "express";
import type { RequestType } from "../types/RequestType";
import env from "../config/env";

export class HTTPError extends Error {
	public statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

const errorHandler = (
	err: any,
	req: RequestType,
	res: Response,
	next: NextFunction
) => {
	let message = "Internal Server Error";
	let statusCode = 500;

	if (err instanceof HTTPError) {
		message = err.message;
		statusCode = err.statusCode;
	}

	if (env.NODE_ENV !== "production") {
		console.error(`Error: ${message}`);
		return res.status(statusCode).json({
			success: false,
			message,
		});
	}

	res.status(statusCode).json({
		success: false,
		message,
	});
};

export default errorHandler;
