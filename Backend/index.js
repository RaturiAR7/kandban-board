require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");

const app = express();
const PORT = 5000;

///MongoDB connection
connectDB();

////Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("Kanban backend is running ✅");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// export for Vercel
module.exports = app;
