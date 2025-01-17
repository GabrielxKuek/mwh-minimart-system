import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trophy } from "lucide-react";
import PropTypes from 'prop-types';
import { bookTask } from '../../services/api';
import TaskDetailsDialog from './TaskDetailsDialog';

const TaskCard = ({ task, onTaskBooked }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const isBooked = task.status === "booked";
    const cardClassName = `h-full flex flex-col ${isBooked ? 'opacity-60 bg-gray-50' : ''}`;

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
        } catch (error) {
            console.error('Error booking task:', error);
        } finally {
            setIsBooking(false);
        }
    };

    // Convert points to number for display
    const pointsValue = parseInt(task.points) || 0;

    return (
        <>
            <Card className={cardClassName}>
                <CardHeader className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                        <CardTitle className={`text-xl font-semibold ${isBooked ? 'text-gray-500' : 'text-indigo-700'}`}>
                            {task.name}
                        </CardTitle>
                        <Badge
                            variant="secondary"
                            className={
                                isBooked
                                    ? 'bg-gray-100 text-gray-500'
                                    : 'bg-indigo-100 text-indigo-700'
                            }
                        >
                            {task.status}
                        </Badge>
                    </div>
                    <div className="flex flex-col gap-3">
                        {task.deadline && (
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className={`h-4 w-4 ${isBooked ? 'text-gray-400' : 'text-indigo-500'}`} />
                                    <span>Deadline</span>
                                </div>
                                <span className="text-sm font-medium text-gray-700 pl-6">
                                    {new Date(task.deadline).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Trophy className={`h-4 w-4 ${isBooked ? 'text-gray-400' : 'text-indigo-500'}`} />
                                <span>Points</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 pl-6">
                                {pointsValue} points
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button
                        variant="outline"
                        className={`w-full ${
                            isBooked
                                ? 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                : 'border-indigo-200 hover:bg-indigo-50'
                        }`}
                        onClick={() => setShowDetails(true)}
                    >
                        View Details
                    </Button>
                    {!isBooked && (
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={handleBookTask}
                            disabled={isBooking}
                        >
                            {isBooking ? 'Booking...' : 'Book Now'}
                        </Button>
                    )}
                </CardContent>
            </Card>
            <TaskDetailsDialog
                open={showDetails}
                onOpenChange={setShowDetails}
                task={task}
                onTaskBooked={onTaskBooked}
            />
        </>
    );
};

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        points: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        deadline: PropTypes.string,  // Made optional
        status: PropTypes.string.isRequired,
    }).isRequired,
    onTaskBooked: PropTypes.func
};

export default TaskCard;