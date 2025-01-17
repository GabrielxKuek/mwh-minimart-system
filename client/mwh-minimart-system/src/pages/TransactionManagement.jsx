import React, { useState, useEffect } from "react";
import { getTransactions } from "@/services/api";
import TransactionTable from "@/components/transactions/TransactionTable";
import { Toaster, toast } from "react-hot-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionClaimed = (transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, status: "claimed" }
          : transaction
      )
    );
    toast.success("Transaction claimed successfully!");
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      transaction.id.toLowerCase().includes(searchLower) ||
      (transaction.user &&
        (transaction.user.name.toLowerCase().includes(searchLower) ||
          transaction.user.email.toLowerCase().includes(searchLower) ||
          transaction.user.nric.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Management</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Search by Transaction ID, Name, Email, or NRIC"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
        />
        <Search className="ml-2" size={20} />
      </div>

      <TransactionTable
        transactions={filteredTransactions}
        onTransactionClaimed={handleTransactionClaimed}
      />
      <Toaster />
    </div>
  );
};

export default TransactionManagement;
