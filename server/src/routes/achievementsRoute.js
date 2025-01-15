const express = require("express");
const router = express.Router();
const { db } = require("../configs/firebase"); // Import your Firebase config
const { collection, getDocs } = require("firebase/firestore");

router.get("/", async (req, res) => {
  // Route path is now '/' because it will be prefixed by '/achievements' in mainRoutes.js
  try {
    const querySnapshot = await getDocs(collection(db, "achievements"));
    const achievements = [];
    querySnapshot.forEach((doc) => {
      achievements.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

module.exports = router;
