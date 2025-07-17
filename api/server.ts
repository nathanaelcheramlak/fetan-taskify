import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import env from "./config/env";
import errorHandler from "./middleware/error.middleware";
import connectDB from "./config/db";

import authRoutes from "./routes/auth.route";
import profileRoutes from "./routes/profile.route";
import taskRoutes from "./routes/task.route";

const app = express();

// Server Config
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// cors config (allows all origins)
app.use(cors({ origin: true, credentials: true }));

// Health check endpoint
app.use("/health", (req, res) => res.send("Server is healthy"));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Custom error-handling middleware
app.use(errorHandler);

// Connect to DB and start server
const PORT = env.PORT;
app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server is running on port ${PORT}`);
});
