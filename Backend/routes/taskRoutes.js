const express = require("express");
const {
  createTask,
  getTasksByBoard,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/TaskController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createTask);
router.get("/board/:boardId", protect, getTasksByBoard);
router.post("/delete", protect, deleteTask);
router.post("/update", protect, updateTaskStatus);

module.exports = router;
