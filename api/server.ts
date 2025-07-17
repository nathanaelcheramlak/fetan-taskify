import express from "express";
import cookieParser from "cookie-parser";
import env from "./config/env";
import errorHandler from "./utils/errorHandler";
import connectDB from "./config/db";

import authRoutes from "./routes/auth.route";
import profileRoutes from "./routes/profile.route";
import taskRoutes from "./routes/task.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("api/v1/tasks", taskRoutes);

app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
