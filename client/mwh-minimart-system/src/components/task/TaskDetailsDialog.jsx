import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy } from "lucide-react";
import { useState } from 'react';
import PropTypes from 'prop-types';
import { bookTask } from '../../services/api';

const TaskDetailsDialog = ({ open, onOpenChange, task, onTaskBooked }) => {
    const [isBooking, setIsBooking] = useState(false);

    const handleBookTask = async () => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        try {
            setIsBooking(true);
            await bookTask(userId, task.id);
            onTaskBooked && onTaskBooked();
            onOpenChange(false);
        } catch (error) {
            console.error('Error booking task:', error);
        } finally {
            setIsBooking(false);
        }
    };

    // Convert points to number for display
    const pointsValue = parseInt(task.points) || 0;

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
                        {task.deadline && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="h-4 w-4 text-indigo-500" />
                                <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-500">
                            <Trophy className="h-4 w-4 text-indigo-500" />
                            <span>{pointsValue} points</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Description</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                    {task.status !== "booked" && (
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={handleBookTask}
                            disabled={isBooking}
                        >
                            {isBooking ? 'Booking...' : 'Book Task'}
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
        points: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        deadline: PropTypes.string, // Made optional
        status: PropTypes.string.isRequired,
    }).isRequired,
    onTaskBooked: PropTypes.func
};

export default TaskDetailsDialog;