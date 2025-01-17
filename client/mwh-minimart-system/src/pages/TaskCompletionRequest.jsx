import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Search, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTaskRequests, updateTaskStatus } from "../services/api";

const ImagePreviewDialog = ({ isOpen, onClose, imageUrl, taskName }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{taskName} - Completion Image</DialogTitle>
      </DialogHeader>
      <div className="relative mt-4">
        <img 
          src={imageUrl} 
          alt="Task Completion" 
          className="w-full h-auto rounded-lg"
          style={{ maxHeight: '70vh' }}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          onClick={() => window.open(imageUrl, '_blank')}
          className="mr-2 gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </DialogContent>
  </Dialog>
);

ImagePreviewDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  taskName: PropTypes.string
};

const TaskCompletionList = ({ searchQuery, statusFilter }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const statusQuery = statusFilter === 'all' ? 'pending,completed' : statusFilter;
        const fetchedTasks = await getTaskRequests(statusQuery);
        setTasks(fetchedTasks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [statusFilter]);

  const handleStatusChange = async (userTaskId, newStatus) => {
    try {
      await updateTaskStatus(userTaskId, newStatus);
      
      setTasks(tasks.map(task => 
        task.userTaskId === userTaskId ? { ...task, status_id: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleImageClick = (task) => {
    setSelectedImage({
      url: task.completion_image,
      taskName: task.task?.name || 'Task'
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      (task.task?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <ImagePreviewDialog 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url}
        taskName={selectedImage?.taskName}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Name</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.userTaskId}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{task.task?.name}</span>
                  {task.completion_image && (
                    <button 
                      onClick={() => handleImageClick(task)}
                      className="text-sm text-blue-600 hover:underline text-left mt-1"
                    >
                      View Image
                    </button>
                  )}
                </div>
              </TableCell>
              <TableCell>{task.task?.points}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeClass(task.status_id)}>
                  {task.status_id.charAt(0).toUpperCase() + task.status_id.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {task.updated_at ? new Date(task.updated_at).toLocaleString() : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {task.status_id === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-500 hover:bg-green-50"
                        onClick={() => handleStatusChange(task.userTaskId, 'completed')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleStatusChange(task.userTaskId, 'incomplete')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {task.status_id === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusChange(task.userTaskId, 'incomplete')}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

TaskCompletionList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
};

const TaskCompletionRequest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Completion Requests
      </h1>
      <Separator className="my-4" />
      
      <div className="mb-4 flex items-center gap-4">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by Task Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 rounded-md"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <TaskCompletionList 
          searchQuery={searchQuery} 
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
};

export default TaskCompletionRequest;