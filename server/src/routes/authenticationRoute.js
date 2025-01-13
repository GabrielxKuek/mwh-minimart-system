// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

// INCLUDES
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authenticationController');

// CONTROLLERS
router.get('/all/:user_id', controller.readAllTaskByUser);
router.get('/completed/:user_id', controller.readCompletedTasksByUser);
router.get('/pending/:user_id', controller.readPendingTasksByUser);
router.get('/incomplete/:user_id', controller.readIncompleteTasksByUser);

module.exports = router;