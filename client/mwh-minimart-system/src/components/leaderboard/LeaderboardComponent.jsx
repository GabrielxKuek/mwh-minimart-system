import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function LeaderboardComponent({
  experienceLeaderboard,
  achievementsLeaderboard,
}) {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Leaderboard
          </CardTitle>
          <CardDescription className="text-gray-600">
            Top users by experience and achievements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Experience Leaderboard */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                By Experience Points
              </h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="w-[60px] text-left">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Level</TableHead>
                      <TableHead className="text-right">Experience</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experienceLeaderboard.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-gray-800">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-right text-gray-700">
                          {Math.floor(user.total_points / 1000) + 1}
                        </TableCell>
                        <TableCell className="text-right text-gray-700">
                          {user.total_points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Achievements Leaderboard */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                By Achievements
              </h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="w-[60px] text-left">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Achievements</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {achievementsLeaderboard.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-gray-800">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {user.achievements
                              .slice(0, 5)
                              .map((achievement) => (
                                <div
                                  key={achievement.id}
                                  className="rounded-full overflow-hidden border-2 border-gray-300"
                                >
                                  <img
                                    src={achievement.imageURL}
                                    alt={achievement.badgeTitle}
                                    className="h-8 w-8"
                                  />
                                </div>
                              ))}
                            {user.achievements.length > 5 && (
                              <Badge variant="outline" className="rounded-full">
                                +{user.achievements.length - 5}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeaderboardComponent;
