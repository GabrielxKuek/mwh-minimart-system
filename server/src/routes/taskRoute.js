// this file just for you guys' reference. i made in year 1, might not be v optimised LOL

// INCLUDES
const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

// CONTROLLERS
router.get('/:user_id', controller.readAllTasksByUser);

module.exports = router;