const express = require("express");
const router = express.Router();
// const { db } = require("../firebase"); // Import Firestore or other Firebase services

const taskRoutes = require("./taskRoutes");

router.use("/tasks", taskRoutes);

module.exports = router;