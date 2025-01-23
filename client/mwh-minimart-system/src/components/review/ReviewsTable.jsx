import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import { Star } from "lucide-react";
  import PropTypes from 'prop-types';
  
  const ReviewsTable = ({ reviews, onReviewStatusChange }) => {
    const renderStars = (rating) => {
      return Array(5)
        .fill(0)
        .map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ));
    };
  
    const getStatusButton = (status) => {
      switch (status) {
        case "pending":
          return {
            text: "Approve",
            variant: "outline",
            className: "bg-green-50 border-green-300 text-green-600 hover:bg-green-100"
          };
        case "approved":
          return {
            text: "Hide",
            variant: "outline",
            className: "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
          };
        case "hidden":
          return {
            text: "Show",
            variant: "outline",
            className: "bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100"
          };
        default:
          return {
            text: "Action",
            variant: "outline",
            className: ""
          };
      }
    };
  
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => {
              const buttonConfig = getStatusButton(review.status);
              
              return (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={review.product.image_url}
                        alt={review.product.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span>{review.product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{review.user.name}</span>
                      <span className="text-sm text-gray-500">{review.user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-md truncate">{review.review}</p>
                  </TableCell>
                  <TableCell>
                    {new Date(review.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={`capitalize ${
                      review.status === 'approved' ? 'text-green-600' :
                      review.status === 'hidden' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {review.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onReviewStatusChange(review.id, review.status)}
                      variant={buttonConfig.variant}
                      size="sm"
                      className={buttonConfig.className}
                    >
                      {buttonConfig.text}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  ReviewsTable.propTypes = {
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        product: PropTypes.shape({
          name: PropTypes.string.isRequired,
          image_url: PropTypes.string.isRequired,
        }).isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        review: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['pending', 'approved', 'hidden']).isRequired,
      })
    ).isRequired,
    onReviewStatusChange: PropTypes.func.isRequired,
  };
  
  export default ReviewsTable;