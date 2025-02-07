import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTotalResidents, getTotalPendingRequests, getLowStockItems, getApprovedRequests, getRecentChanges, getTotalPendingTasks } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [totalResidents, setTotalResidents] = useState(0);
  const [totalPendingRequests, setTotalPendingRequests] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [recentChanges, setRecentChanges] = useState([]);
  const [totalPendingTasks, setTotalPendingTasks] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [notificationsShown, setNotificationsShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const residents = await getTotalResidents();
      const pendingRequests = await getTotalPendingRequests();
      const lowStock = await getLowStockItems();
      const approvedRequestsData = await getApprovedRequests();
      const changes = await getRecentChanges();
      const pendingTasks = await getTotalPendingTasks();

      setTotalResidents(residents);
      setTotalPendingRequests(pendingRequests);
      setLowStockItems(lowStock);
      setApprovedRequests(approvedRequestsData);
      setRecentChanges(changes);
      setTotalPendingTasks(pendingTasks);

      // Set chart data
      setChartData(approvedRequestsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!notificationsShown) {
      toast.warning("There are new low stock products");
      toast.info("There are new pending requests");
      setNotificationsShown(true);
    }
  }, [notificationsShown]);

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }
    return "Invalid date";
  };

  const emptyChartData = [{ name: "No Data", quantity: 0 }];

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Residents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalResidents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalPendingTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalPendingRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{lowStockItems}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Products Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.length ? chartData : emptyChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentChanges.map((change, index) => (
                <li key={index} className="text-sm">
                  {`${change.type} ${change.action}: ${change.name} (Time: ${formatTimestamp(change.timestamp)})`}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;