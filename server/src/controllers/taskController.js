// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

const model = require("../models/taskModel.js");

// 6. POST /tasks
module.exports.createNewTask = (req, res, next) => {
  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined
  ) {
    res.status(400).json({
      message: "Error: title, description or points is undefined",
    });
    /*
        Note: Add later 

        If the provided email is already associated with another user, return 409
        Conflict.
        If the request body is missing username or email, return 400 Bad Request.

        also the error codes and stuff for everything else
        */

    return;
  }

  const data = {
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewTask:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        task_id: results.insertId,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
      });
    }
  };

  model.insertTask(data, callback);
};

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
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined
  ) {
    res.status(400).json({
      message: "Error: title, description or points is undefined",
    });
    return;
  }

  const data = {
    task_id: req.params.task_id,
    title: req.body.title,
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
          title: req.body.title,
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
