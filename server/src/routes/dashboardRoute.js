// INCLUDES
const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');

// CONTROLLERS
router.get('/voucher/all/:user_id', controller.readAllVoucherByUser);
router.get('/voucher/redeemed/:user_id', controller.readRedeemedVoucherByUser);
router.get('/voucher/unredeemed/:user_id', controller.readUnredeemedVoucherByUser);

router.get('/request/all/:user_id', controller.readAllRequestByUser);
router.get('/request/pending/:user_id', controller.readPendingRequestByUser);
router.get('/request/approved/:user_id', controller.readApprovedRequestByUser);
router.get('/request/rejected/:user_id', controller.readRejectedRequestByUser);

module.exports = router;