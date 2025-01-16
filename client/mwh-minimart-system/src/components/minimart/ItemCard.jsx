import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { enterTransaction } from "../../services/api";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PurchaseDialog from './PurchaseDialog';

function generateTransactionId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(
    { length: 5 }, 
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

const ItemCard = ({ item, onPurchaseComplete }) => {
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Convert string values to numbers
  const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity, 10) : item.quantity;
  const points = typeof item.point === 'string' ? parseInt(item.point, 10) : item.point;
  const isOutOfStock = quantity === 0;

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsPurchaseDialogOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handlePurchase = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const productQuantity = parseInt(purchaseQuantity);
      const totalPoints = points * productQuantity;
      
      // Create products object with proper format
      const products = [{
        [item.product_id]: productQuantity
      }];

      await enterTransaction(
        generateTransactionId(),
        totalPoints,
        products
      );
      
      // Reset dialog state
      setIsPurchaseDialogOpen(false);
      setPurchaseQuantity(1);
      
      // Notify parent component to refresh data
      if (onPurchaseComplete) {
        onPurchaseComplete(item.product_id);
      }
    } catch (error) {
      setError(error.message || 'Failed to purchase item');
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
              onClick={() => console.log(`Requesting ${item.name}`)}
            >
              Request Item
            </Button>
          ) : (
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => setIsPurchaseDialogOpen(true)}
            >
              Purchase Item
            </Button>
          )}
        </CardContent>
      </Card>

      <PurchaseDialog
        isOpen={isPurchaseDialogOpen}
        onClose={() => setIsPurchaseDialogOpen(false)}
        onConfirm={handlePurchase}
        itemName={item.name}
        pointsPerItem={points}
        isSubmitting={isSubmitting}
        error={error}
        purchaseQuantity={purchaseQuantity}
        onQuantityChange={setPurchaseQuantity}
      />
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
  onPurchaseComplete: PropTypes.func,
};

export default ItemCard;