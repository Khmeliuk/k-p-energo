import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: [String],
    required: [true, "status is required"],
  },
  department: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, "department is required"],
    trim: true,
  },
  task: {
    type: String,
    required: [true, "task is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
    trim: true,
  },
  dateToEndTask: {
    type: Date,
  },
  createDate: {
    type: Date,
    default: () => Date.now(),
  },
  update: [
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      updateTime: { type: Date, default: Date.now },
      patch: { type: mongoose.Schema.Types.Mixed },
    },
  ],
  description: [String],
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
