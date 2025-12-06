import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'User reference is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
