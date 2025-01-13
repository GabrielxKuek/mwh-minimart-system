// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

// INCLUDES
const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

// CONTROLLERS
router.get('/', controller.readAllTasks);
router.get('/:task_id', controller.readTaskById);

router.post('/', controller.createNewTask);
router.put('/:task_id', controller.updateTaskById);
router.delete('/:task_id', controller.deleteTaskById);

module.exports = router;