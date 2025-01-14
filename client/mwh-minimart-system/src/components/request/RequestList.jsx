import { useState, useEffect } from "react";
import { getRequests, approveRequest, rejectRequest } from "../../services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from "react-toastify";
import {
  User,
  Utensils,
  Package,
  CheckCircle,
  XCircle,
  CircleEllipsis,
} from "lucide-react";

const RequestList = ({ refreshTrigger }) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      console.log("Fetched requests:", data); // Log the fetched requests
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to fetch requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [refreshTrigger]);

  const handleApprove = async (requestId) => {
    try {
      await approveRequest(requestId);
      setRequests(
        requests.map((request) =>
          request.id === requestId ? { ...request, status_id: "approved" } : request
        )
      );
      toast.success("Request approved successfully!");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      setRequests(
        requests.map((request) =>
          request.id === requestId ? { ...request, status_id: "rejected" } : request
        )
      );
      toast.success("Request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request.");
    }
  };

  return (
    <div>
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
              <TableHead className="font-medium text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
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
                    ) : request.status_id === "pending" ? (
                      <CircleEllipsis className="h-4 w-4 text-gray-500" />
                    ) : null}
                    {request.status_id}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="default"
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RequestList;