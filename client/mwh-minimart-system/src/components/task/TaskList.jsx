import { useState, useEffect } from "react";
import { getAllTasks, deleteTask } from "../../services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { Search, ChevronDown, AlertTriangle } from "lucide-react";
import EditTaskForm from "./EditTaskForm";

const TaskList = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      // Ensure points are numbers
      const tasksWithNumericPoints = data.map(task => ({
        ...task,
        points: Number(task.points),
      }));
      setTasks(tasksWithNumericPoints);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  const handleTaskEdit = () => {
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
    return (
      task.name.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 rounded-md"
          />
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Description</TableHead>
              <TableHead className="font-medium">Points</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.points}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-8 p-0 rounded-md">
                        <span className="sr-only">Open</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 rounded-md" align="end">
                      <div className="grid gap-4 p-2">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            {task.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        <Separator />
                        <div className="grid gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full rounded-lg"
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-lg">
                              <DialogHeader>
                                <DialogTitle>Task Details</DialogTitle>
                                <DialogDescription>
                                  Details for {task.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-1 p-2">
                                <img
                                  src={task.imageUrl}
                                  alt={task.name}
                                  className="h-40 w-40 object-cover rounded-md mx-auto"
                                />
                                <p>
                                  <strong>Name:</strong> {task.name}
                                </p>
                                <p>
                                  <strong>Description:</strong> {task.description}
                                </p>
                                <p>
                                  <strong>Points:</strong> {task.points}
                                </p>
                              </div>
                              <DialogFooter>
                                <DialogTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    className="rounded-md"
                                  >
                                    Close
                                  </Button>
                                </DialogTrigger>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <EditTaskForm
                            task={task}
                            onTaskEdit={handleTaskEdit}
                          />
                          <Button
                            variant="destructive"
                            className="w-full rounded-md"
                            onClick={() => handleDelete(task.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskList;