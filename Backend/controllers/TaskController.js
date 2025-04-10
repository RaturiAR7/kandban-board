const Task = require("../models/TaskModel.js");
const Board = require("../models/BoardModel.js");

const createTask = async (req, res) => {
  try {
    const { title, description, boardId, status, priority } = req.body;
    ///Find the board to be update
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    /////Create a new task
    const task = await Task.create({
      title,
      description,
      board: boardId,
      status,
      priority: priority, // Set the priority based on the current number of tasks
    });
    ////Add task to the board's tasks array
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

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    console.log("Task ID:", taskId);
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    ////Remove task from the board's tasks array
    const board = await Board.findById(task.board);
    if (!board) return res.status(404).json({ message: "Board not found" });
    console.log("Board Task:", board.tasks);
    board.tasks = board.tasks.filter((task) => task.toString() !== taskId);
    console.log("Updated Board Tasks:", board.tasks);
    await board.save();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId, status, title, description } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (status) task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;
    await task.save();
    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
};

module.exports = { createTask, getTasksByBoard, deleteTask, updateTask };
