import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import ReviewDialog from '../components/review/ReviewDialog';

const FeedbackButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 px-4"
        >
          <MessageSquarePlus className="w-5 h-5" />
          <span>Give Feedback</span>
        </Button>
      </div>

      <ReviewDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        itemName="Website"
      />
    </>
  );
};

export default FeedbackButton;