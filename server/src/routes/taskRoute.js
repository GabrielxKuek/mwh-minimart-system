const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Route to create a new task
router.post('/', upload.single('image'), taskController.addTask);

// Route to get all tasks
router.get('/', taskController.getAllTasks);

// Route to get a task by ID
router.get('/:taskId', taskController.getTask);

// Route to update a task by ID
router.put('/:taskId', upload.single('image'), taskController.updateTask);

// Route to delete a task by ID
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;