const express = require("express");
const requestController = require("../controllers/requestController.js");
const firebaseAuthMiddleware = require("../middlewares/firebaseAuthMiddleware.js");

const router = express.Router();

// Request routes
router.get("/:requestId", requestController.getRequest);
router.get("/", requestController.getAllRequests);
router.put("/:requestId/approve", requestController.approveRequest);
router.put("/:requestId/reject", requestController.rejectRequest);
router.post("/getUserName", requestController.getUserName);
router.post("/getProductName", requestController.getProductName);

module.exports = router;
