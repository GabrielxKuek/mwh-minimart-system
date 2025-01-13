
const express = require("express");
const router = express.Router();

////////////////////////////////////////////////////////////
// the routes just for you guys' reference. i made in year 1, might not be v optimised LOL
////////////////////////////////////////////////////////////

// define routes
const taskRoutes = require("./taskRoutes");

// // use routes
// router.use("/users", userRoute);
router.use("/tasks", taskRoutes);
// router.use("/task_progress", progressRoute);
// router.use("/forum", forumRoute);

module.exports = router;
