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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import dummyProductRequests from "../../data/dummyProductRequests";
import dummyInventory from "../../data/dummyInventory";
import dummyVouchers from "../../data/dummyVouchers";
import dummyUserActivity from "../../data/dummyUserActivity";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function ReportModal({ open, setOpen }) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("Weekly Product Requests", 10, 10);
    autoTable(doc, {
      head: [["Week", "Product", "User ID", "Quantity"]],
      body: dummyProductRequests.flatMap((weekData) =>
        weekData.requests.map((req) => [
          weekData.week,
          req.product,
          req.userId,
          req.quantity,
        ])
      ),
      startY: 20,
    });

    doc.addPage();
    doc.text("Inventory Summary", 10, 10);
    autoTable(doc, {
      head: [["Product", "Current Stock", "Low Stock"]],
      body: dummyInventory.map((item) => [
        item.product,
        item.currentStock,
        item.currentStock <= item.lowStockThreshold ? "Yes" : "No",
      ]),
      startY: 20,
    });

    doc.addPage();
    doc.text("Voucher Activity", 10, 10);
    autoTable(doc, {
      head: [["User ID", "Earned", "Spent", "Balance"]],
      body: dummyVouchers.map((voucher) => [
        voucher.userId,
        voucher.earned,
        voucher.spent,
        voucher.balance,
      ]),
      startY: 20,
    });

    doc.addPage();
    doc.text("User Activity", 10, 10);
    autoTable(doc, {
      head: [["User ID", "Activity Score", "Most Requested Products"]],
      body: dummyUserActivity.map((user) => [
        user.userId,
        user.activityScore,
        user.mostRequested.join(", "),
      ]),
      startY: 20,
    });

    // Save the PDF
    doc.save("minimart-report.pdf");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Minimart System Report</DialogTitle>
          <DialogDescription>
            Generated on: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Weekly Product Requests */}
          <div>
            <h3 className="font-semibold">Weekly Product Requests</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyProductRequests.flatMap((weekData) =>
                  weekData.requests.map((req) => (
                    <TableRow
                      key={`${weekData.week}-${req.userId}-${req.product}`}
                    >
                      <TableCell>{weekData.week}</TableCell>
                      <TableCell>{req.product}</TableCell>
                      <TableCell>{req.userId}</TableCell>
                      <TableCell>{req.quantity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Inventory Summary */}
          <div>
            <h3 className="font-semibold">Inventory Summary</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Low Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyInventory.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>
                      {item.currentStock <= item.lowStockThreshold
                        ? "Yes"
                        : "No"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Voucher Activity */}
          <div>
            <h3 className="font-semibold">Voucher Activity</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Earned</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyVouchers.map((voucher) => (
                  <TableRow key={voucher.userId}>
                    <TableCell>{voucher.userId}</TableCell>
                    <TableCell>{voucher.earned}</TableCell>
                    <TableCell>{voucher.spent}</TableCell>
                    <TableCell>{voucher.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* User Activity */}
          <div>
            <h3 className="font-semibold">User Activity</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Activity Score</TableHead>
                  <TableHead>Most Requested Products</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyUserActivity.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.activityScore}</TableCell>
                    <TableCell>{user.mostRequested.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;
