import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const UploadCSV = ({ onUpload }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (csvFile) {
      onUpload(csvFile);
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2">Upload CSV</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload CSV</DialogTitle>
        </DialogHeader>
        <Input type="file" accept=".csv" onChange={handleFileChange} />
        <Button onClick={handleUpload} className="mt-4">
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCSV;