import { Response, NextFunction } from "express";
import type { RequestType } from "../types/RequestType";
import { CustomError } from "../types/ErrorType";
import User from "../models/user.model";

export const getProfile = async (
	req: RequestType,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.user) {
			throw new CustomError("Unauthorized: Login with your account", 400);
		}
		const userId = req.user.id;

		const user = await User.findById(userId);
		if (!user) {
			throw new CustomError("User not found", 404);
		}

		res.status(200).json({
			success: true,
			message: "User fetched successfully",
			data: {
				id: user._id,
				fullname: user.fullname,
				email: user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};
