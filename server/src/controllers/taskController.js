const taskModel = require("../models/taskModel");

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

const taskController = {
    // Original task management functions
    async addTask(req, res) {
        try {
            const taskData = req.body;
            const file = req.file;

            const newTask = await taskModel.addTask(taskData, file);
            res.status(201).json(newTask);
        } catch (error) {
            console.error("Error adding task:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async getTask(req, res) {
        try {
            const { taskId } = req.params;
            const task = await taskModel.getTaskById(taskId);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.status(200).json(task);
        } catch (error) {
            console.error("Error getting task:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async getAllTasks(req, res) {
        try {
            const tasks = await taskModel.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error getting all tasks:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const taskData = req.body;
            const file = req.file;

            const updatedTask = await taskModel.updateTask(taskId, taskData, file);
            res.status(200).json(updatedTask);
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            await taskModel.deleteTask(taskId);
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // User tasks and booking functions
    async getUserTasks(req, res) {
        try {
            const userId = req.headers.userid;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const tasks = await taskModel.getUserTasks(userId);
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error getting user tasks:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async bookTask(req, res) {
        try {
            const { userId, taskId } = req.body;
            
            if (!userId || !taskId) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // First verify the task exists
            const task = await taskModel.getTaskById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            const result = await TaskHistory.createTaskBooking(userId, taskId);
            res.status(201).json({ success: true, historyId: result.id });
        } catch (error) {
            console.error('Error booking task:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async uploadTaskCompletion(req, res) {
        try {
            const { userTaskId } = req.params;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: "Completion image is required" });
            }

            const result = await TaskHistory.submitCompletion(userTaskId, file);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error uploading task completion:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async getUserHistory(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const history = await TaskHistory.getUserTaskHistory(userId);
            res.status(200).json(history);
        } catch (error) {
            console.error("Error fetching user history:", error);
            res.status(500).json({ message: error.message });
        }
    },

    async updateTaskStatus(req, res) {
        try {
            const { historyId } = req.params;
            const { status, adminId } = req.body;

            if (!status) {
                return res.status(400).json({ message: "Status is required" });
            }

            const result = await TaskHistory.updateTaskStatus(historyId, status, adminId);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error updating task status:", error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = taskController;