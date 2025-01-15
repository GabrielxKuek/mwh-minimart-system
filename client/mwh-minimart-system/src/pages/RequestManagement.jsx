import { useState } from "react";
import RequestList from "../components/request/RequestList";
import { Separator } from "@/components/ui/separator";

const RequestManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Request Management
      </h1>
      <Separator className="my-4" />
      <div className="rounded-lg border">
        <RequestList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default RequestManagement;
