const taskModel = require("../models/taskModel");

const taskController = {
  async addTask(req, res) {
    try {
      const taskData = req.body;
      const file = req.file; // Assuming you use multer for file uploads

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

      console.log("Updating task with ID:", taskId); // Add logging here
      console.log("Task data:", taskData); // Add logging here
      if (file) {
        console.log("File received:", file.originalname); // Add logging here
      }

      const updatedTask = await taskModel.updateTask(taskId, taskData, file);
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error); // Add logging here
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
};

module.exports = taskController;