import { useState, useEffect } from "react";
import { getUsers, suspendUser, reactivateUser } from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Search,
  User,
  Mail,
  BadgeInfo,
  ChevronDown,
  XCircle,
  CheckCircle,
} from "lucide-react";

const UserList = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const handleSuspend = async (userId) => {
    try {
      await suspendUser(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status_id: "suspended" } : user
        )
      );
      toast.success("User suspended successfully!");
    } catch (error) {
      console.error("Error suspending user:", error);
      toast.error("Failed to suspend user.");
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await reactivateUser(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status_id: "active" } : user
        )
      );
      toast.success("User reactivated successfully!");
    } catch (error) {
      console.error("Error reactivating user:", error);
      toast.error("Failed to reactivate user.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.nric.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name, email, or NRIC"
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
              <TableHead className="w-[100px] font-medium">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Name
                </div>
              </TableHead>
              <TableHead className="font-medium">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
              </TableHead>
              <TableHead className="font-medium">
                <div className="flex items-center gap-1">
                  <BadgeInfo className="h-4 w-4" />
                  NRIC
                </div>
              </TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nric}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {user.status_id === "active" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    {user.status_id}
                  </div>
                </TableCell>
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
                            {user.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
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
                                <DialogTitle>User Details</DialogTitle>
                                <DialogDescription>
                                  Details for {user.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-1 p-2">
                                <p>
                                  <strong>Name:</strong> {user.name}
                                </p>
                                <p>
                                  <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                  <strong>NRIC:</strong> {user.nric}
                                </p>
                                <p>
                                  <strong>Status:</strong> {user.status_id}
                                </p>
                                <p>
                                  <strong>Current Points:</strong>{" "}
                                  {user.current_points}
                                </p>
                                <p>
                                  <strong>Total Points:</strong>{" "}
                                  {user.total_points}
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
                          {user.status_id === "active" ? (
                            <Button
                              variant="destructive"
                              className="w-full rounded-md"
                              onClick={() => handleSuspend(user.id)}
                            >
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                              onClick={() => handleReactivate(user.id)}
                            >
                              Reactivate
                            </Button>
                          )}
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

export default UserList;
