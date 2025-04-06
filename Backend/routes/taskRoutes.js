const express = require("express");
const {
  createTask,
  getTasksByBoard,
  deleteTask,
} = require("../controllers/TaskController");
const router = express.Router();

router.post("/create", createTask);
router.get("/board/:boardId", getTasksByBoard);
router.delete("/delete", deleteTask);

module.exports = router;
