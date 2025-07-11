import mongoose, { Schema, model, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: "pending" | "completed";
  user: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Task name must be at least 3 characters long"],
      maxlength: [100, "Task name cannot exceed 100 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      lowercase: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ user: 1 });

const Task = model<ITask>("Task", taskSchema);
export default Task;
