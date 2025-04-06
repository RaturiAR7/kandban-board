const express = require("express");
const { createBoard } = require("../controllers/BoardController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createBoard);

module.exports = router;
