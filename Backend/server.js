require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const { registerUser } = require("./controllers/userController");

const app = express();
const PORT = 5000;

///MongoDB connection
connectDB();

////Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
