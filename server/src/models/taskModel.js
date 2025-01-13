// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

const pool = require("../services/db");

// 6. POST /tasks
module.exports.insertTask = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
    `;
  const VALUES = [data.title, data.description, data.points];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// 7. GET /tasks
module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Task;
    `;

  pool.query(SQLSTATEMENT, callback);
};

// 8. GET /tasks/{task_id}
module.exports.selectById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
  const VALUES = [data.task_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// 9. PUT /tasks/{task_id}
module.exports.updateById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE Task 
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;
    `;
  const VALUES = [data.title, data.description, data.points, data.task_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// 10. DELETE /tasks/{task_id}
module.exports.deleteById = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM Task
    WHERE task_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;

    DELETE FROM TaskProgress
    WHERE task_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
  const VALUES = [data.task_id, data.task_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
