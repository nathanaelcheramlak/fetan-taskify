import mongoose from "mongoose";
import env from "../config/env";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error: any) {
    console.error("MongoDB Error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
