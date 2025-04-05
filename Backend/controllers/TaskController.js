const Task = require("../models/taskModel.js");
const Board = require("../models/boardModel.js");

const createTask = async (req, res) => {
  try {
    const { title, description, boardId, status } = req.body;
    /////Create a new task
    const task = await Task.create({
      title,
      description,
      board: boardId,
      status,
    });
    ////Add task to the board's tasks array
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    board.tasks.push(task._id);
    await board.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({ board: boardId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

module.exports = { createTask, getTasksByBoard };
