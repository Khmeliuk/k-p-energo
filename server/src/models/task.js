import mongoose from "mongoose";
import User from "./user.js";

const TaskSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    // required: [true, "owner is required"],
  },
  department: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, "department is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "address is required"],
    trim: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  update: [
    {
      owner: {},
      updateTime: { type: Date, default: Date.now },
      patch: {},
    },
  ],

  task: [{ type: String, required: [true, "task is required"] }],
});

const task = mongoose.model("Task", TaskSchema);
export default task;
