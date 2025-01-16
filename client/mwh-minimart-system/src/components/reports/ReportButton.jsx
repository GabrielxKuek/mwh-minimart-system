import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReportModal from "./ReportModal";

function ReportButton() {
  const [open, setOpen] = useState(false);

  const handleGenerateReport = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleGenerateReport}>Generate Report</Button>
      <ReportModal open={open} setOpen={setOpen} />
    </>
  );
}

export default ReportButton;
