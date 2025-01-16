// INCLUDES
const express = require('express');
const router = express.Router();
const controller = require('../controllers/voucherController');

// CONTROLLERS
// router.get('/voucher/:user_id', controller.readAllProductByAll);
// router.get('/request/:user_id', controller.readAllRequestByUser);
// router.post('/create', controller.createRequest);

router.get('/userId', controller.readVoucherByUserId);
router.get('/product/:productId', controller.readVoucherProductById);

module.exports = router;