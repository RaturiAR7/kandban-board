const express = require("express");
const {
  createTask,
  getTasksByBoard,
  deleteTask,
} = require("../controllers/TaskController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createTask);
router.get("/board/:boardId", protect, getTasksByBoard);
router.delete("/delete", protect, deleteTask);

module.exports = router;
