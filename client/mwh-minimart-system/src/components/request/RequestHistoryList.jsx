import { useState, useEffect } from "react";
import { getRequests } from "../../services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from "react-toastify";
import {
  User,
  Utensils,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RequestHistoryList = ({ searchQuery }) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      console.log("Fetched requests:", data); // Log the fetched requests
      setRequests(data.filter(request => request.status_id !== "pending"));
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    const query = searchQuery.toLowerCase();
    return (
      request.user?.name.toLowerCase().includes(query) ||
      request.product?.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-medium">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Name
              </div>
            </TableHead>
            <TableHead className="font-medium">
              <div className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                Product
              </div>
            </TableHead>
            <TableHead className="w-[100px] font-medium text-center">
              <div className="flex items-center justify-center gap-1">
                <Package className="h-4 w-4" />
                Quantity
              </div>
            </TableHead>
            <TableHead className="font-medium text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.user?.name || "Unknown User"}</TableCell>
              <TableCell>{request.product?.name || "Unknown Product"}</TableCell>
              <TableCell className="text-center">{request.quantity}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {request.status_id === "approved" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : request.status_id === "rejected" ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : null}
                  {request.status_id}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestHistoryList;