import { useState } from "react";
import RequestHistoryList from "../components/request/RequestHistoryList";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const RequestHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Request History
      </h1>
      <Separator className="my-4" />
      <div className="mb-4 flex items-center">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by Name or Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 rounded-md"
          />
        </div>
      </div>
      <div className="rounded-lg border">
        <RequestHistoryList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default RequestHistory;