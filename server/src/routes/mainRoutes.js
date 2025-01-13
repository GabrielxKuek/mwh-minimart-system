const express = require("express");
const router = express.Router();

// define routes
const taskRoute = require("./taskRoute");

// use routes
router.use("/tasks", taskRoute);

module.exports = router;
