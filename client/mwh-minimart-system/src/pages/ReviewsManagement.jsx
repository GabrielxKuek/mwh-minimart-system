import React, { useState, useEffect } from "react";
import { getReviews, updateReviewStatus } from "@/services/api";
import ReviewsTable from "./ReviewsTable";
import { Toaster, toast } from "react-hot-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewStatusChange = async (reviewId, currentStatus) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "pending":
          newStatus = "approved";
          break;
        case "approved":
          newStatus = "hidden";
          break;
        case "hidden":
          newStatus = "approved";
          break;
        default:
          newStatus = "pending";
      }

      await updateReviewStatus(reviewId, newStatus);
      
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? { ...review, status: newStatus }
            : review
        )
      );

      toast.success(`Review ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating review status:", error);
      toast.error("Failed to update review status");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      review.product.name.toLowerCase().includes(term) ||
      review.user.name.toLowerCase().includes(term) ||
      review.user.email.toLowerCase().includes(term) ||
      review.review.toLowerCase().includes(term)
    );

    const matchesStatus = statusFilter === "all" || review.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reviews Management</h1>

      <div className="flex items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex items-center flex-1">
          <Input
            type="text"
            placeholder="Search by product, user, or review content"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Search className="ml-2" size={20} />
        </div>

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No reviews found</div>
      ) : (
        <ReviewsTable
          reviews={filteredReviews}
          onReviewStatusChange={handleReviewStatusChange}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default ReviewsManagement;