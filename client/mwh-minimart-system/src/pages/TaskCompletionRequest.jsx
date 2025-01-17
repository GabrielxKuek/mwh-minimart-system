import { useState } from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Dummy data based on your Firestore structure
const dummyTasks = [
  {
    id: "76WX56Ju5QYkEqaEdyPq",
    user_id: "ysqZyF75qJLzfcLFsyWo",
    task_id: "Fwmc15khu5Yy2hkLGaJN",
    status_id: "pending",
    updated_at: "2025-01-17T10:42:15.351Z",
    completion_image: "https://firebasestorage.googleapis.com/v0/b/muhammadiyah-db.firebasestorage.app/o/task_completion_images%2F76WX56Ju5QYkEqaEdyPq",
    task: {
      name: "Watering the plants",
      description: "Water the plants in the welfare home",
      points: "50"
    },
    user: {
      name: "fdsfds",
      email: "e0866232@u.nus.edu"
    }
  },
  {
    id: "89YZ67Kv6RZlFrbFezRr",
    user_id: "htRzHG86rKMgdLGtWo",
    task_id: "GhNj26khv6Zz3ikMHbKM",
    status_id: "completed",
    updated_at: "2025-01-16T15:30:00.000Z",
    completion_image: "https://example.com/image2.jpg",
    task: {
      name: "Clean the common area",
      points: "75"
    },
    user: {
      name: "John Smith",
      email: "john.smith@u.nus.edu"
    }
  },
  {
    id: "90AB78Lw7SAm",
    user_id: "iuSzIH97sLNheMHuXp",
    task_id: "HiOk37liv7Aa4jlNIcLN",
    status_id: "pending",
    updated_at: "2025-01-15T14:20:00.000Z",
    completion_image: "https://example.com/image3.jpg",
    task: {
      name: "Organize library books",
      points: "100"
    },
    user: {
      name: "Jane Doe",
      email: "jane.doe@u.nus.edu"
    }
  }
];

const TaskCompletionList = ({ searchQuery, statusFilter }) => {
  const [tasks, setTasks] = useState(dummyTasks);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ? 
      (task.status_id === 'pending' || task.status_id === 'completed') :
      task.status_id === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status_id: newStatus } : task
    ));
  };

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task Name</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Submitted At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span>{task.task.name}</span>
                {task.completion_image && (
                  <a 
                    href="#"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(task.completion_image, '_blank');
                    }}
                  >
                    View Image
                  </a>
                )}
              </div>
            </TableCell>
            <TableCell>{task.task.points}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>{task.user.name}</span>
                <span className="text-sm text-gray-500">{task.user.email}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusBadgeClass(task.status_id)}>
                {task.status_id.charAt(0).toUpperCase() + task.status_id.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(task.updated_at).toLocaleString()}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {task.status_id === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-500 hover:bg-green-50"
                      onClick={() => handleStatusChange(task.id, 'completed')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusChange(task.id, 'incomplete')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {task.status_id === 'completed' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-50"
                      onClick={() => handleStatusChange(task.id, 'pending')}
                    >
                      Pending
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusChange(task.id, 'incomplete')}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
        Task Completion Requests
      </h1>
      <Separator className="my-4" />
      
      <div className="mb-4 flex items-center gap-4">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by Task or User"
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