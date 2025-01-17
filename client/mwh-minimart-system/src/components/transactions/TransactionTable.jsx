import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ClaimTransactionDialog from "./ClaimTransactionDialog";

const TransactionTable = ({ transactions, onTransactionClaimed }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleClaimClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
  };

  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Transaction ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>NRIC</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="w-32">Total Points</TableHead>
            <TableHead className="w-32">Status</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.user?.name}</TableCell>
              <TableCell>{transaction.user?.email}</TableCell>
              <TableCell>{transaction.user?.nric}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {transaction.products.map((product) => (
                    <li key={product.name}>
                      {product.name} ({product.quantity})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{transaction.points_cost}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleClaimClick(transaction)}
                  disabled={transaction.status === "claimed"}
                  variant="outline"
                  size="sm"
                >
                  Claim
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ClaimTransactionDialog
        open={openDialog}
        onClose={handleDialogClose}
        transaction={selectedTransaction}
        onTransactionClaimed={onTransactionClaimed}
      />
    </div>
  );
};

export default TransactionTable;
