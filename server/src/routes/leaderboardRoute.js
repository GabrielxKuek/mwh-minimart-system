// server/src/routes/leaderboardRoute.js
const express = require("express");
const router = express.Router();
const { getLeaderboardData } = require("../controllers/leaderboardController");
// GET /leaderboard (fetch leaderboard data)
router.get("/", getLeaderboardData);

module.exports = router;
