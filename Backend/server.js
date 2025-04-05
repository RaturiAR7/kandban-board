const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

////Middlewares
app.use(cors());
app.use(bodyParser.json());

///MongoDB connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/kanban", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
