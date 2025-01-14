import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AchievementCard = ({ achievement }) => {
  return (
    <Card className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-6">
        {" "}
        {/* Remove padding-bottom */}
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 flex-shrink-0">
            {" "}
            {/* Circular container */}
            <img
              src={achievement.imageURL}
              alt={achievement.imageDescription}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-4">
            {" "}
            {/* Add margin-left */}
            <CardTitle className="text-lg font-semibold">
              {achievement.badgeTitle}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          {achievement.description}
        </CardDescription>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-bold">Requirements:</span>{" "}
          {/* Bold the requirements label */}
          {achievement.requirements}
        </p>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
