// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import routes and middleware
const mainRoute = require("./routes/mainRoute");

// Create an Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use("/", express.static(path.join(__dirname, "public")));

// Use imported routes
app.use("/api", mainRoute);

// Health check route
app.get("/", (req, res) => {
  res.send("I am Alive!");
});

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Export the app
module.exports = app;