const express = require("express");
const { createBoard } = require("../controllers/BoardController");
const router = express.Router();

router.post("/create", createBoard);

module.exports = router;
