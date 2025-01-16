const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const firebaseAuthMiddleware = require("../middlewares/firebaseAuthMiddleware");

router.get("/", transactionController.getAllTransactions);
router.put("/claim", transactionController.updateTransactionStatus);

module.exports = router;
