import express from "express";
import isAuthenticated from "../middleware/auth.middleware";
import {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
} from "../controllers/task.controller";

const router = express.Router();

router.get("/", isAuthenticated, getTasks);
router.post("/", isAuthenticated, createTask);
router.patch("/:id", isAuthenticated, updateTask);
router.delete("/:id", isAuthenticated, deleteTask);

export default router;
