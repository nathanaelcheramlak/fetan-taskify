import express from "express";
import {
	signup,
	login,
	logout,
	forgotPassword,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/forgot-password", forgotPassword);

export default router;
