// import express from "express";
// import userController from "../controllers/userController.js";
// import firebaseAuthMiddleware from "../middlewares/firebaseAuthMiddleware.js";

// const router = express.Router();

// router.post(
//   "/",
//   firebaseAuthMiddleware,
//   userController.addNewUser.bind(userController)
// );
// router.get(
//   "/:userId",
//   firebaseAuthMiddleware,
//   userController.getUser.bind(userController)
// );
// router.get(
//   "/",
//   firebaseAuthMiddleware,
//   userController.getAllUsers.bind(userController)
// );
// router.put(
//   "/:userId",
//   firebaseAuthMiddleware,
//   userController.updateUser.bind(userController)
// );
// router.put(
//   "/:userId/suspend",
//   firebaseAuthMiddleware,
//   userController.suspendUser.bind(userController)
// );
// router.put(
//   "/:userId/reactivate",
//   firebaseAuthMiddleware,
//   userController.reactivateUser.bind(userController)
// );
// router.get(
//   "/search",
//   firebaseAuthMiddleware,
//   userController.findUsers.bind(userController)
// );

// export default router;
const express = require("express");
const userController = require("../controllers/userController.js");
const firebaseAuthMiddleware = require("../middlewares/firebaseAuthMiddleware.js");

const router = express.Router();

router.post("/", userController.addNewUser);
router.get("/:userId", userController.getUser);
router.get("/", userController.getAllUsers);
router.put("/:userId", userController.updateUser);
router.put("/:userId/suspend", userController.suspendUser);
router.put("/:userId/reactivate", userController.reactivateUser);
router.get("/search", userController.findUsers);

module.exports = router;
