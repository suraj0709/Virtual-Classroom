const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const classRoutes = require("./routes/class");
const unitRoutes = require("./routes/unit");
const sessionRoutes = require("./routes/session");
const commentRoutes = require("./routes/comment");

// Initialize dotenv to use environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a simple route for testing
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port here ${PORT}`);
});

//routes

app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/comments", commentRoutes);
