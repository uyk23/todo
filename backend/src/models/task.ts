import mongoose from "mongoose";
import { TaskType } from "../shared/types";

const taskSchema = new mongoose.Schema<TaskType>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  detail: { type: String, required: false },
  categories: [{ type: String, required: true }],
  tags: [{ type: String, required: false }],
  dueDate: { type: String, required: false },
});

const Task = mongoose.model<TaskType>("Task", taskSchema);
export default Task;
