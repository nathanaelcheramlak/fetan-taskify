import { CustomError } from "../types/ErrorType";
import { RequestType } from "../types/RequestType";
import { NextFunction, Response } from "express";
import type {
	SignupRequestBody,
	LoginRequestBody,
	UserPayload,
} from "../types/RequestType";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { clearJWT, setJWT } from "../utils/JWT";

export const signup = async (
	req: RequestType<{}, {}, SignupRequestBody>,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.body) {
			throw new CustomError("Invalid request body", 400);
		}
		const { fullname, email, password } = req.body;

		// Validate Fields
		if (!fullname || !email || !password) {
			throw new CustomError("Fullname, email, and password are required", 400);
		}

		// Validate Email
		if (!/^\S+@\S+\.\S+$/.test(email)) {
			throw new CustomError("Invalid email format", 400);
		}

		// Validate Password
		if (password.length < 8) {
			throw new CustomError("Password must be at least 8 characters long", 400);
		}

		// Check existing user
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new CustomError("Email already exists", 400);
		}

		const user = new User({ fullname, email, password });
		await user.save();
		console.log(user);

		// Generate JWT
		const userPayload: UserPayload = { id: user.id };
		setJWT(userPayload, res);

		res.status(201).json({
			success: true,
			message: "User created successfully",
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

export const login = async (
	req: RequestType<{}, {}, LoginRequestBody>,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.body) {
			throw new CustomError("Invalid request body", 400);
		}
		const { email, password } = req.body;

		// Validate Fields
		if (!email || !password) {
			throw new CustomError("Email and Password is required", 400);
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw new CustomError("Invalid credentials", 401);
		}

		// Check password match
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new CustomError("Invalid credentials", 400);
		}

		// Generate JWT
		const userPayload: UserPayload = { id: user.id };
		setJWT(userPayload, res);

		res.status(200).json({
			success: true,
			message: "Login successful",
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

export const logout = async (
	req: RequestType,
	res: Response,
	next: NextFunction
) => {
	try {
		clearJWT(res);
		res.status(200).json({ success: true, message: "Logout successful" });
	} catch (error) {
		next(error);
	}
};

export const forgotPassword = async (req: RequestType, res: Response) => {};
