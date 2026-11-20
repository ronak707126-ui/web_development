
const express = require("express");

const postRoutes = require("./routes/postRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Blog REST API!",
    endpoints: [
      "POST /posts",
      "GET /posts",
      "GET /posts/:id",
      "PUT /posts/:id",
      "DELETE /posts/:id"
    ]
  });
});

// Blog routes
app.use("/posts", postRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found."
  });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
