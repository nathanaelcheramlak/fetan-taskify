import { Request } from "express";

export type UserPayload = {
	id: string;
};

export interface SignupRequestBody {
	fullname: string;
	email: string;
	password: string;
}

export interface LoginRequestBody {
	email: string;
	password: string;
}

export interface CreateTaskRequestBody {
	name: string;
	status?: "pending" | "completed";
}

export interface GetTaskRequestQuery {
	page?: number;
	limit?: number;
}

export type RequestType<P = {}, Q = {}, B = {}> = Request<P, any, B, Q> & {
	user?: UserPayload;
};
