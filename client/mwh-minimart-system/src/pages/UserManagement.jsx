import { useState } from "react";
import UserList from "../components/user/UserList";
import AddUserForm from "../components/user/AddUserForm";
import { Separator } from "@/components/ui/separator";
import UploadCSV from "@/components/user/UploadCSV";

const UserManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleUserAdded = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        User Management
      </h1>
      <Separator className="my-4" />
      <div className="flex justify-end mb-4 space-x-2">
        <UploadCSV onUpload={handleUserAdded} />
        <AddUserForm onUserAdd={handleUserAdded} />
      </div>
      <div className="rounded-lg border">
        <UserList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default UserManagement;
