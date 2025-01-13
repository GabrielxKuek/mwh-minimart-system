// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

// INCLUDES
const express = require('express');
const router = express.Router();

const taskController = require("../controllers/taskController");

// CONTROLLERS
// Route to create a new task
router.post("/", taskController.createNewTask);
router.get('/', taskController.getAllTask);

module.exports = router;