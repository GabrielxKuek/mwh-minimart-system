import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, Image as ImageIcon } from "lucide-react";
import PropTypes from 'prop-types';
import TaskCompletionDialog from './TaskCompletionDialog';

const UserTaskCard = ({ task, onTaskUpdate }) => {
    const [showCompletion, setShowCompletion] = useState(false);
    const isCompleted = task.status === "completed";

    const formatDate = (dateString) => {
        if (!dateString) return 'Not started';
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'incomplete':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const handleCompletionSuccess = (result) => {
        if (onTaskUpdate) {
            onTaskUpdate(result);
        }
    };

    const cardClassName = `h-full flex flex-col ${isCompleted ? 'opacity-80 bg-gray-50' : ''}`;

    return (
        <>
            <Card className={cardClassName}>
                <CardHeader className="space-y-4 flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                            <CardTitle className={`text-xl font-semibold ${
                                isCompleted ? 'text-gray-500' : 'text-indigo-700'
                            }`}>
                                {task.name}
                            </CardTitle>
                        </div>
                        <Badge
                            variant="secondary"
                            className={getStatusColor(task.status)}
                        >
                            {task.status}
                        </Badge>
                    </div>

                    {task.imageUrl && (
                        <div className="relative h-40 w-full overflow-hidden rounded-lg">
                            <img
                                src={task.imageUrl}
                                alt={task.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className={`h-4 w-4 ${
                                    isCompleted ? 'text-gray-400' : 'text-indigo-500'
                                }`} />
                                <span>Last Updated</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 pl-6">
                                {formatDate(task.updatedAt)}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Trophy className={`h-4 w-4 ${
                                    isCompleted ? 'text-gray-400' : 'text-indigo-500'
                                }`} />
                                <span>Points</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 pl-6">
                                {parseInt(task.points, 10)} points
                            </span>
                        </div>

                        {task.completionImage && (
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <ImageIcon className="h-4 w-4 text-green-500" />
                                    <span>Completion Proof Submitted</span>
                                </div>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {task.description}
                    </p>
                    {!isCompleted && (
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => setShowCompletion(true)}
                        >
                            Complete Task
                        </Button>
                    )}
                </CardContent>
            </Card>

            <TaskCompletionDialog
                open={showCompletion}
                onOpenChange={setShowCompletion}
                task={task}
                onSuccess={handleCompletionSuccess}
            />
        </>
    );
};

UserTaskCard.propTypes = {
    task: PropTypes.shape({
        userTaskId: PropTypes.string.isRequired,
        taskId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        bookedAt: PropTypes.string,
        updatedAt: PropTypes.string,
        completionImage: PropTypes.string,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        points: PropTypes.string.isRequired,
    }).isRequired,
    onTaskUpdate: PropTypes.func,
};

export default UserTaskCard;