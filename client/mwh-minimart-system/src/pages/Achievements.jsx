import { useState, useEffect } from "react";
import { getAchievements } from "../services/api";
import AchievementCard from "../components/achievements/AchievementCard";
import { Separator } from "@/components/ui/separator";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const fetchedAchievements = await getAchievements();
      setAchievements(fetchedAchievements);
    };

    fetchAchievements();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Achievements</h1>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
