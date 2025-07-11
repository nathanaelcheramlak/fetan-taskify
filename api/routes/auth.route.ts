import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  forgotPasswordController,
} from "../controllers/auth.controller";
import isAuthenticated from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.delete("/logout", isAuthenticated, logoutController);

router.post("/forgot-password", forgotPasswordController);
export default router;
