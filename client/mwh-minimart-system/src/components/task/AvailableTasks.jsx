import { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import TaskCard from "./TaskCard";

const AvailableTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("https://mwh-minimart-system-backend.onrender.com/api/tasks/");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data); // Update tasks state
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message); // Update error state
    } finally {
      setLoading(false); // Stop loading spinner
    }
  }, []);

  useEffect(() => {
    fetchTasks(); // Call the function when the component mounts
  }, [fetchTasks]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Available Tasks
      </h1>
      
      <Separator className="my-4" />

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTasks;