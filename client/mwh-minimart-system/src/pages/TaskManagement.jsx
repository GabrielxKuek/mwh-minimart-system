import { useState } from "react";
import TaskList from "../components/task/TaskList";
import AddTaskForm from "../components/task/AddTaskForm";
import { Separator } from "@/components/ui/separator";

const TaskManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleTaskAdded = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Task Management
      </h1>
      <Separator className="my-4" />
      <div className="flex justify-end mb-4">
        <AddTaskForm onTaskAdd={handleTaskAdded} />
      </div>
      <div className="rounded-lg border">
        <TaskList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default TaskManagement;