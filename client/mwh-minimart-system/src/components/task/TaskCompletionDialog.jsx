import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload } from "lucide-react";
import { uploadTaskCompletion } from '../../services/api';

const TaskCompletionDialog = ({ open, onOpenChange, task, onSuccess }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback((file) => {
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }

            setSelectedImage(file);
            setError(null);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }, []);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedImage) {
            setError('Please select an image');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const result = await uploadTaskCompletion(task.userTaskId, selectedImage);
            if (onSuccess) {
                onSuccess(result);
            }
            onOpenChange(false);
        } catch (error) {
            console.error('Upload failed:', error);
            setError('Failed to upload completion image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const resetState = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setError(null);
        setIsDragging(false);
    };

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            if (!newOpen) {
                resetState();
            }
            onOpenChange(newOpen);
        }}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Complete Task: {task.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">
                            Upload Completion Proof
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label 
                                className={`flex flex-col items-center justify-center w-full h-64 
                                border-2 rounded-lg cursor-pointer 
                                ${isDragging 
                                    ? 'border-indigo-500 border-solid bg-indigo-50' 
                                    : 'border-gray-300 border-dashed bg-gray-50'} 
                                hover:bg-gray-100 transition-colors duration-200`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img 
                                                src={previewUrl} 
                                                alt="Preview" 
                                                className="max-h-48 rounded-lg"
                                            />
                                            <p className="text-sm text-gray-500 mt-2">
                                                Click or drag to change image
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon className="w-12 h-12 mb-4 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG or JPEG (MAX. 5MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                />
                            </label>
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedImage || isUploading}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isUploading ? (
                                <>
                                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Submit Completion'
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

TaskCompletionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    onSuccess: PropTypes.func,
};

export default TaskCompletionDialog;