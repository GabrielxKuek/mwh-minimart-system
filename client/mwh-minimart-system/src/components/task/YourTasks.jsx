import { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import UserTaskCard from "./UserTaskCard";
import { getAllUserTasks } from "../../services/api";

const YourTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem('userId');
      const data = await getAllUserTasks(userId);
      setTasks(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useCallback(() => {
    switch (activeTab) {
      case "completed":
        return tasks.filter(task => task.status === "completed");
      case "incomplete":
        return tasks.filter(task => task.status === "incomplete");
      case "pending":
        return tasks.filter(task => task.status === "pending");
      default:
        return tasks;
    }
  }, [tasks, activeTab]);

  const getTaskStats = () => {
    const completed = tasks.filter(task => task.status === "completed").length;
    const pending = tasks.filter(task => task.status === "pending").length;
    const totalPoints = tasks.reduce((sum, task) => sum + parseInt(task.points, 10), 0);
    const earnedPoints = tasks
      .filter(task => task.status === "completed")
      .reduce((sum, task) => sum + parseInt(task.points, 10), 0);

    return { completed, pending, total: tasks.length, totalPoints, earnedPoints };
  };

  const stats = getTaskStats();

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading tasks: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Your Tasks</h1>
        
        <div className="mt-4 md:mt-0 bg-indigo-50 rounded-lg p-4 flex gap-4">
          <div className="text-sm">
            <span className="text-indigo-600 font-semibold">
              {stats.completed}/{stats.total}
            </span>{" "}
            <span className="text-gray-600">Tasks Completed</span>
          </div>
          <div className="text-sm">
            <span className="text-yellow-600 font-semibold">
              {stats.pending}
            </span>{" "}
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="text-sm">
            <span className="text-indigo-600 font-semibold">
              {stats.earnedPoints}/{stats.totalPoints}
            </span>{" "}
            <span className="text-gray-600">Points Earned</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : filteredTasks().length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks().map((task) => (
                <UserTaskCard 
                  key={task.userTaskId} 
                  task={task}
                  onTaskUpdate={fetchTasks}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourTasks;