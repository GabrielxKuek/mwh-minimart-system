const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/book', taskController.bookTask);
router.post('/:historyId/complete', upload.single('photo'), taskController.submitCompletion);
router.get('/user/:userId', taskController.getUserHistory);
router.patch('/:historyId/status', taskController.updateStatus);

// Route to create a new task
router.post('/', upload.single('image'), taskController.addTask);

// Route to get all tasks
router.get('/', taskController.getAllTasks);

// Route to delete a task by ID
router.delete('/:taskId', taskController.deleteTask);


// Route to get a task by ID
router.get('/:taskId', taskController.getTask);

// Route to update a task by ID
router.put('/:taskId', upload.single('image'), taskController.updateTask);

module.exports = router;

module.exports = router;