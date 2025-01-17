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

  // UserTasks
  async getUserTasks(req, res) {
    try {
      const userId = req.headers.userid;

      const tasks = await taskModel.getUserTasks(userId);
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error getting user tasks:", error);
      res.status(500).json({ message: error.message });
    }
  },

  async uploadTaskCompletion(req, res) {
    try {
      const { userTaskId } = req.params;
      const file = req.file;

      // Validate if file exists
      if (!file) {
        return res.status(400).json({ 
          message: "Completion image is required" 
        });
      }

      console.log("Uploading completion for userTaskId:", userTaskId);
      console.log("File received:", file.originalname);

      const result = await taskModel.uploadTaskCompletion(userTaskId, file);
      
      res.status(200).json(result);
    } catch (error) {
      console.error("Error uploading task completion:", error);
      res.status(500).json({ message: error.message });
    }
  },

  async getTaskRequests(req, res) {
    try {
      const { status } = req.query;
      let statusFilter = null;
      
      if (status) {
        statusFilter = status.split(',');
      }

      const requests = await taskModel.getTaskRequests(statusFilter);
      res.status(200).json(requests);
    } catch (error) {
      console.error("Error getting task requests:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Update task status (pending/completed/incomplete)
  async updateTaskStatus(req, res) {
    try {
      const { userTaskId } = req.params;
      const { status_id } = req.body;

      // Validate status
      const validStatuses = ['pending', 'completed', 'incomplete'];
      if (!validStatuses.includes(status_id)) {
        return res.status(400).json({ 
          message: "Invalid status. Must be one of: pending, completed, incomplete" 
        });
      }

      // Update task status
      const updatedTask = await taskModel.updateTaskStatus(userTaskId, status_id);

      // If task is marked as completed, assign points
      let pointsResult = null;
      if (status_id === 'completed') {
        pointsResult = await taskModel.assignTaskPoints(userTaskId, status_id);
      }

      // Return combined response
      res.status(200).json({
        task: updatedTask,
        points: pointsResult
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      
      if (error.message === "UserTask not found") {
        return res.status(404).json({ message: error.message });
      }
      
      res.status(500).json({ message: error.message });
    }
  },

  async bookTask(req, res) {
    try {
      const userId = req.body;
      const { taskId } = req.body;

      // Validate input
      if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Book the task
      const booking = await taskModel.bookTask(userId, taskId);
      
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error booking task:", error);
      
      // Handle specific errors
      if (error.message === "User has already booked this task") {
        return res.status(400).json({ message: error.message });
      }
      
      if (error.message === "Task not found") {
        return res.status(404).json({ message: error.message });
      }
      
      // Handle any other errors
      res.status(500).json({ message: "Failed to book task" });
    }
  }
};

module.exports = taskController;