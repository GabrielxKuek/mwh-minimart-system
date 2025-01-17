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
import TaskDetailsDialog from './TaskDetailsDialog';

const TaskCard = ({ task }) => {
    const [showDetails, setShowDetails] = useState(false);

    const isBooked = task.status === "booked";
    const cardClassName = `h-full flex flex-col ${isBooked ? 'opacity-60 bg-gray-50' : ''}`;

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
                        <div className="flex flex-col gap-1">
                            {/* <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className={`h-4 w-4 ${isBooked ? 'text-gray-400' : 'text-indigo-500'}`} />
                                <span>Deadline</span>
                            </div> */}
                            {/* <span className="text-sm font-medium text-gray-700 pl-6">
                                {new Date(task.deadline).toLocaleDateString()}
                            </span> */}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Trophy className={`h-4 w-4 ${isBooked ? 'text-gray-400' : 'text-indigo-500'}`} />
                                <span>Points</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 pl-6">
                                {task.points} points
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
            <TaskDetailsDialog
                open={showDetails}
                onOpenChange={setShowDetails}
                task={task}
            />
        </>
    );
};

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default TaskCard;