import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTotalUsers, getTotalPendingRequests, getLowStockItems, getRecentChanges } from "../services/api";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPendingRequests, setTotalPendingRequests] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [recentChanges, setRecentChanges] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getTotalUsers();
      const pendingRequests = await getTotalPendingRequests();
      const lowStock = await getLowStockItems();
      const changes = await getRecentChanges();

      setTotalUsers(users);
      setTotalPendingRequests(pendingRequests);
      setLowStockItems(lowStock);
      setRecentChanges(changes);

      // Example chart data
      setChartData([
        { name: "Jan", value: 30 },
        { name: "Feb", value: 20 },
        { name: "Mar", value: 50 },
        { name: "Apr", value: 40 },
        { name: "May", value: 60 },
      ]);
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }
    return "Invalid date";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Blank</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">-</p>
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
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
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
                  {change.type === "User" || change.type === "Request"
                    ? `${change.type}: ${change.name} Status: ${change.status} (Updated at: ${formatTimestamp(change.updated_at)})`
                    : `${change.type}: ${change.name} Quantity: ${change.quantity} (Updated at: ${formatTimestamp(change.updated_at)})`}
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