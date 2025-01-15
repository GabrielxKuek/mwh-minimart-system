const express = require("express");
const router = express.Router();

// Define routes
const taskRoute = require("./taskRoute");
const dashboardRoute = require("./dashboardRoute");
const authenticationRoute = require("./authenticationRoute");
const minimartRoute = require("./minimartRoute");
const userRoute = require("./userRoute");
const requestRoute = require("./requestRoute");
const inventoryRoute = require("./inventoryRoute");
const achievementsRoute = require("./achievementsRoute");
const leaderboardRoute = require("./leaderboardRoute");

// Use routes
router.use("/tasks", taskRoute); // Ensure this line is included
router.use("/dashboard", dashboardRoute);
router.use("/authentication", authenticationRoute);
router.use("/minimart", minimartRoute);
router.use("/users", userRoute);
router.use("/requests", requestRoute);
router.use("/inventory", inventoryRoute);
router.use("/achievements", achievementsRoute);
router.use("/leaderboard", leaderboardRoute);

module.exports = router;