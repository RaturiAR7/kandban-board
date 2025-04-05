const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"], // Task status
    default: "TODO",
  },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true }, // References the board the task belongs to
});

module.exports = mongoose.model("Task", TaskSchema);
