// INCLUDES
const express = require('express');
const router = express.Router();
const controller = require('../controllers/minimartController');

// CONTROLLERS
// router.get('/voucher/:user_id', controller.readAllProductByAll);
// router.get('/request/:user_id', controller.readAllRequestByUser);
// router.post('/create', controller.createRequest);

router.get('/product/all', controller.readAllProductByAll);
router.post('/product/create', controller.createTransaction);

module.exports = router;