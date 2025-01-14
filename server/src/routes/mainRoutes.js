const express = require("express");
const router = express.Router();

// define routes
const taskRoute = require("./taskRoute");
const dashboardRoute = require("./dashboardRoute");
const authenticationRoute = require("./authenticationRoute");
const minimartRoute = require("./minimartRoute");
const userRoute = require("./userRoute");

// use routes
router.use("/task", taskRoute);
router.use("/dashboard", dashboardRoute);
router.use("/authentication", authenticationRoute);
router.use("/minimart", minimartRoute);
router.use("/users", userRoute);

module.exports = router;
