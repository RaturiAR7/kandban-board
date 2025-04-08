const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"], // Task status
      default: "TODO",
    },
    priority: {
      type: Number,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    }, // References the board the task belongs to
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
