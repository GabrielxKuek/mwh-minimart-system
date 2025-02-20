import { useState } from "react";
import { addUser } from "../../services/api";
import { Button } from "@/components/ui/button";
import bcrypt from "bcryptjs"; // Import bcrypt
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

const AddUserForm = ({ onUserAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    nric: "",
    role_id: "resident",
    status_id: "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role_id: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the salt rounds
      const updatedFormData = {
        ...formData,
        password: hashedPassword,
      };

      // Send the updated data with the hashed password
      await addUser(updatedFormData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        birthdate: "",
        nric: "",
        role_id: "resident",
        status_id: "active",
      });
      
      toast.success("User added successfully!");
      onUserAdd();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
        >
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
            
            {/* Role Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                onValueChange={handleRoleChange}
                defaultValue={formData.role_id}
              >
                <SelectTrigger className="col-span-3 rounded-md">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">Resident</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Other Inputs */}
            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
            
            {/* Birthdate */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthdate" className="text-right">
                Birthdate
              </Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
            
            {/* NRIC */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nric" className="text-right">
                NRIC
              </Label>
              <Input
                id="nric"
                name="nric"
                value={formData.nric}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserForm;