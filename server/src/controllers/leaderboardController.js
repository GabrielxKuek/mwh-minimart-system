const { db } = require("../configs/firebase");
const {
  collection,
  getDocs,
  query,
  orderBy,
  where,
} = require("firebase/firestore"); // Import client-side SDK functions

const getLeaderboardData = async (req, res) => {
  try {
    // Fetch users and sort by total_points (experience)
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, orderBy("total_points", "desc"));
    const usersSnapshot = await getDocs(usersQuery);
    const usersData = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch user achievements and count
    const userAchievementsRef = collection(db, "UserAchievements");
    const userAchievementsSnapshot = await getDocs(userAchievementsRef);
    const userAchievementsData = userAchievementsSnapshot.docs.reduce(
      (acc, doc) => {
        const data = doc.data();
        acc[data.userId] = (acc[data.userId] || 0) + 1;
        return acc;
      },
      {}
    );

    // Combine data and sort by achievements count, then name
    const combinedAchievementsData = usersData
      .map((user) => ({
        ...user,
        achievementsCount: userAchievementsData[user.id] || 0,
      }))
      .sort((a, b) => {
        if (b.achievementsCount !== a.achievementsCount) {
          return b.achievementsCount - a.achievementsCount;
        }
        return a.name.localeCompare(b.name);
      });

    // Fetch achievement details for display
    const achievementsRef = collection(db, "achievements");
    const achievementsSnapshot = await getDocs(achievementsRef);
    const achievementsData = achievementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Map achievement IDs to achievement details for each user
    const detailedAchievementsData = await Promise.all(
      combinedAchievementsData.map(async (user) => {
        const userAchievementsQuery = query(
          collection(db, "UserAchievements"),
          where("userId", "==", user.id)
        );
        const userAchievementsSnapshot = await getDocs(userAchievementsQuery);
        const userAchievementIds = userAchievementsSnapshot.docs.map(
          (doc) => doc.data().achievementId
        );
        const userAchievements = userAchievementIds.map((achievementId) =>
          achievementsData.find((a) => a.id === achievementId)
        );
        return {
          ...user,
          achievements: userAchievements,
        };
      })
    );

    const experienceLeaderboard = usersData.slice(0, 10);
    const achievementsLeaderboard = detailedAchievementsData.slice(0, 10);

    res.status(200).json({ experienceLeaderboard, achievementsLeaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getLeaderboardData,
};
