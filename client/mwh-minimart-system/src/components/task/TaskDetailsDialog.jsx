import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy } from "lucide-react";
import PropTypes from 'prop-types';
import axios from 'axios';

const TaskDetailsDialog = ({ open, onOpenChange, task }) => {
    const handleBookTask = async () => {
        try {
            
            const response = await axios.post('http://localhost:8080/api/tasks/book', {userId: sessionStorage.getItem('userId'), taskId: task.id});
            console.log(sessionStorage.getItem('userId'));
            console.log('Task created:', response.data);
            
            console.log('Booking task:', task.id);
            onOpenChange(false);
        } catch (error) {
            console.log(sessionStorage.getItem('userId'));
            console.log(task.id);
            console.error('Error booking task:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <DialogTitle className="text-xl font-semibold text-indigo-700">
                            {task.name}
                        </DialogTitle>
                        <Badge
                            variant="secondary"
                            className={
                                task.status === "booked"
                                    ? 'bg-gray-100 text-gray-500'
                                    : 'bg-indigo-100 text-indigo-700'
                            }
                        >
                            {task.status}
                        </Badge>
                    </div>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="space-y-4">
                        {/* <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-4 w-4 text-indigo-500" />
                            <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                        </div> */}
                        <div className="flex items-center gap-2 text-gray-500">
                            <Trophy className="h-4 w-4 text-indigo-500" />
                            <span>{task.points} points</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Description</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                    {task.status !== "booked" && (
                        <Button
                            className="w-full"
                            onClick={handleBookTask}
                        >
                            Book Task
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

TaskDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default TaskDetailsDialog;