import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { claimTransaction } from "@/services/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ClaimTransactionDialog = ({
  open,
  onClose,
  transaction,
  onTransactionClaimed,
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    try {
      setLoading(true);
      setError(null);
      await claimTransaction(transaction.id, code);
      onTransactionClaimed(transaction.id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim Transaction</DialogTitle>
          <DialogDescription>
            Enter the code to claim transaction: {transaction?.id}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="code">Code</Label>
          <Input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleClaim} disabled={loading}>
            Claim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimTransactionDialog;
