import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";
import LeaderboardComponent from "../components/leaderboard/LeaderboardComponent";

function Leaderboard() {
  const [experienceLeaderboard, setExperienceLeaderboard] = useState([]);
  const [achievementsLeaderboard, setAchievementsLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaderboard();
        setExperienceLeaderboard(data.experienceLeaderboard);
        setAchievementsLeaderboard(data.achievementsLeaderboard);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="py-10">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <LeaderboardComponent
            experienceLeaderboard={experienceLeaderboard}
            achievementsLeaderboard={achievementsLeaderboard}
          />
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
