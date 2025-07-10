import express from "express";
import env from "./config/env";

const app = express();

app.use("/api/v1/auth");
app.use("/api/v1/profile");
app.use("api/v1/tasks");

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
