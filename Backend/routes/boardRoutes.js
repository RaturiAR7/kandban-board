const express = require("express");
const { createBoard, getBoardsByUser } = require("../controllers/BoardController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:userId", protect, getBoardsByUser);
router.post("/create", protect, createBoard);

module.exports = router;
