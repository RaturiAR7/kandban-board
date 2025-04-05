const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // References tasks
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References the user who owns the board
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", BoardSchema);
