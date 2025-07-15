import { getProfile } from "../controllers/profile.controller";
import isAuthenticated from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.get("/", isAuthenticated, getProfile);

export default router;
