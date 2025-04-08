const express = require("express");
const {
  createBoard,
  getBoardsByUser,
  deleteBoard,
} = require("../controllers/boardController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:userId", protect, getBoardsByUser);
router.post("/create", protect, createBoard);
router.delete("/delete/:boardId", protect, deleteBoard);

module.exports = router;
