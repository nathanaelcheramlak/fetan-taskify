import { Response, NextFunction } from "express";
import {
	RequestType,
	CreateTaskRequestBody,
	GetTaskRequestQuery,
} from "../types/RequestType";
import User from "../models/user.model";
import { HTTPError } from "../middleware/error.middleware";
import Task from "../models/task.model";

export const getTasks = async (
	req: RequestType<{}, GetTaskRequestQuery, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const limit = parseInt(String(req.query.limit)) || 10;
		const page = parseInt(String(req.query.page)) || 1;
		const userId = req.user!.id;

		const tasks = await Task.find({ user: userId })
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		const total = await Task.countDocuments({ user: userId });

		res.status(200).json({
			success: true,
			message: "Tasks fetched successfully",
			data: tasks,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		next(error);
	}
};

export const createTask = async (
	req: RequestType<{}, {}, CreateTaskRequestBody>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, status = "pending" } = req.body ?? {};

		// Validation
		if (typeof name !== "string" || name.trim() === "") {
			throw new HTTPError("Task name must be a non-empty string", 400);
		}

		const userId = req.user!.id;
		const user = await User.findById(userId);
		if (!user) {
			throw new HTTPError("User not found", 404);
		}

		const newTask = new Task({ name, status, user: userId });
		await newTask.save();

		res.status(201).json({
			success: true,
			message: "Task created successfully",
			data: newTask,
		});
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (
	req: RequestType<{ id: string }, {}, { status: string }>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { status } = req.body ?? {};
		const userId = req.user!.id;
		const taskId = req.params.id;

		if (!["pending", "completed"].includes(status)) {
			throw new HTTPError("Invalid status value", 400);
		}

		const task = await Task.findById(taskId);
		if (!task || task.user.toString() !== userId) {
			throw new HTTPError("Task not found", 404);
		}

		task.status = status as "pending" | "completed";
		await task.save();

		res.status(200).json({
			success: true,
			message: "Task updated successfully",
			data: task,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteTask = async (
	req: RequestType<{ id: string }, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const taskId = req.params.id;
		const userId = req.user!.id;

		const task = await Task.findById(taskId);
		if (!task || task.user.toString() !== userId) {
			throw new HTTPError("Task not found", 404);
		}

		await Task.deleteOne({ _id: taskId });

		res.status(200).json({
			success: true,
			message: "Task deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};
