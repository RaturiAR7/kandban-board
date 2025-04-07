const Board = require("../models/boardModel.js");
const User = require("../models/userModel.js");

const createBoard = async (req, res) => {
  const { title, description, userId } = req.body;

  ////TODO
  // const userId=req.user._id; // Get the user ID from the request object

  ///Create a new board
  const board = await Board.create({ title, description, user: userId });
  ///Add the board to the user's boards array
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.boards.push(board._id);
  await user.save();

  res.status(201).json({ message: "Board created successfully", board });
  try {
  } catch (error) {
    res.status(500).json({ message: "Error creating board", error });
  }
};

const getBoardsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const boards = await Board.find({ user: userId });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boards", error });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findByIdAndDelete({ _id: boardId });
    res.status(200).json({ message: "Deleted board successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting board", error });
  }
};

module.exports = { createBoard, getBoardsByUser, deleteBoard };
