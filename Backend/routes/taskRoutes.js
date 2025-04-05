const express = require("express");
const {
  createTask,
  getTasksByBoard,
} = require("../controllers/TaskController");
const router = express.Router();

router.post("/create", createTask);
router.get("/:boardId", getTasksByBoard);

module.exports = router;
