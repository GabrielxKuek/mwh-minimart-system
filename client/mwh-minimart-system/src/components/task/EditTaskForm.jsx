import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateTask } from "../../services/api";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
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
import { toast } from "react-toastify";

const EditTaskForm = ({ task, onTaskEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    points: 0,
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        points: task.points,
        image: null,
      });

      if (task.imageUrl) {
        setPreviewImage(task.imageUrl);
      }
    }
  }, [task]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFormData((prevFormData) => ({ ...prevFormData, image: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const taskData = new FormData();
    taskData.append("name", formData.name);
    taskData.append("description", formData.description);
    taskData.append("points", formData.points);
    if (formData.image) {
      taskData.append("image", formData.image);
    }
    taskData.append("imageUrl", task.imageUrl || ""); // Always append the current image URL, even if it's empty

    // Log the FormData values
    for (let [key, value] of taskData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await updateTask(task.id, taskData);
      toast.success("Task updated successfully!");
      onTaskEdit();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-md">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Modify the details of the task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="points" className="text-right">
                Points
              </Label>
              <Input
                id="points"
                name="points"
                type="number"
                value={formData.points}
                onChange={handleChange}
                className="col-span-3 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div
                {...getRootProps()}
                className="col-span-3 border-2 border-dashed rounded-md p-2 cursor-pointer"
              >
                <input {...getInputProps()} />
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Task Preview"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                ) : (
                  <p>Drag and drop an image here, or click to select one</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditTaskForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onTaskEdit: PropTypes.func.isRequired,
};

export default EditTaskForm;