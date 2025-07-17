import { getProfile } from "../controllers/profile.controller";
import isAuthenticated from "../middleware/auth.middleware";
import express from "express";

const router = express.Router();

router.get("/", isAuthenticated, getProfile);

export default router;
