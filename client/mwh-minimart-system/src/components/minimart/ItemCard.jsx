import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { enterTransaction } from "../../services/api";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ItemCard = ({ item }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestQuantity, setRequestQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Convert string values to numbers
  const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity, 10) : item.quantity;
  const points = typeof item.point === 'string' ? parseInt(item.point, 10) : item.point;
  const isOutOfStock = quantity === 0;

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsDialogOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleRequest = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const productQuantity = parseInt(requestQuantity);
      const totalPoints = points * productQuantity;
      
      // Create products object with proper format
      const products = [{
        [item.product_id]: productQuantity
      }];

      await enterTransaction(
        'abc123',
        totalPoints,
        products
      );
      setIsDialogOpen(false);
    } catch (error) {
      setError(error.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className={`h-full ${isOutOfStock ? 'opacity-75' : ''}`}>
        <CardHeader className="space-y-4">
          <div className="flex gap-4">
            <div className={`w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 ${isOutOfStock ? 'grayscale' : ''}`}>
              <img
                src={item.image_url}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold text-indigo-700">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {item.description}
                </CardDescription>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                  {points} Points
                </Badge>
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-indigo-600">Stock:</span>{' '}
                  {quantity}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isOutOfStock ? (
            <Button
              variant="outline"
              className="w-full bg-orange-50 border-orange-300 text-orange-600 hover:bg-orange-100"
              onClick={() => setIsDialogOpen(true)}
            >
              Request Item
            </Button>
          ) : (
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => console.log(`Purchasing ${item.name}`)}
            >
              Purchase Item
            </Button>
          )}
        </CardContent>
      </Card>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Request {item.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter the quantity you would like to request. This will cost {points} points per item.
                </p>
              </div>

              <div>
                <Input
                  type="number"
                  value={requestQuantity}
                  onChange={(e) => setRequestQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Total points: {points * requestQuantity}
                </p>
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-white hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRequest}
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    product_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    image_url: PropTypes.string.isRequired,
    point: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
  }).isRequired,
};

export default ItemCard;