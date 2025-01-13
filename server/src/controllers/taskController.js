// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

const model = require("../models/taskModel.js");

const taskModel = require("../models/taskModel");

module.exports.createNewTask = async (req, res, next) => {
  const { name, description, image,  points } = req.body;

  // Validate input
  if (!name || !description || !image || !points === undefined) {
    return res
      .status(400)
      .send("Error: name, description, or points is/are undefined");
  }

  const data = { name, description, image, points };

  try {
    // Call the model to insert the data into Firestore
    const newTask = await taskModel.insertSingle(data);

    // Send a successful response with the created task
    res.status(201).json(newTask);
  } catch (error) {
    // Handle errors from Firestore
    console.error("Error createNewTask:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

module.exports.getAllTask = async (req, res) => {
  try {
    const data = await taskModel.getAllTasks();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
}


// 7. GET /tasks
module.exports.readAllTasks = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllTasks:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAll(callback);
};

// 8. GET /tasks/{task_id}
module.exports.readTaskById = (req, res, next) => {
  const data = {
    task_id: req.params.task_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readTaskById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Task not found",
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectById(data, callback);
};

// 9. PUT /tasks/{task_id}
module.exports.updateTaskById = (req, res, next) => {
  if (
    req.body.name == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined
  ) {
    res.status(400).json({
      message: "Error: name, description or points is undefined",
    });
    return;
  }

  const data = {
    task_id: req.params.task_id,
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Task not found",
        });
      } else
        res.status(200).json({
          task_id: req.params.task_id,
          name: req.body.name,
          description: req.body.description,
          points: req.body.points,
        });
    }
  };

  model.updateById(data, callback);
};

// 10. DELETE /tasks/{task_id}
module.exports.deleteTaskById = (req, res, next) => {
  const data = {
    task_id: req.params.task_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskById:", error);
      res.status(500).json(error);
    } else {
      if (results[0].affectedRows == 0) {
        res.status(404).json({
          message: "Task not found",
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.deleteById(data, callback);
};
