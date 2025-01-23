import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dummy data
const dummyVoucherBalance = 50;
const dummyTransactionHistory = [
  { id: 1, date: "2023-10-01", description: "Redeemed Voucher", points: -10 },
  { id: 2, date: "2023-10-02", description: "Earned Points", points: 20 },
  { id: 3, date: "2023-10-03", description: "Redeemed Voucher", points: -5 },
];
const dummyTaskData = [
  { day: "Monday", tasksDone: 3 },
  { day: "Tuesday", tasksDone: 2 },
  { day: "Wednesday", tasksDone: 4 },
  { day: "Thursday", tasksDone: 1 },
  { day: "Friday", tasksDone: 5 },
  { day: "Saturday", tasksDone: 2 },
  { day: "Sunday", tasksDone: 3 },
];

const ResidentDashboard = () => {
  const [voucherBalance, setVoucherBalance] = useState(dummyVoucherBalance);
  const [transactionHistory, setTransactionHistory] = useState(dummyTransactionHistory);
  const [taskData, setTaskData] = useState(dummyTaskData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Resident Dashboard</h1>
      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Voucher Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{voucherBalance} Points</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks Done This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasksDone" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResidentDashboard;