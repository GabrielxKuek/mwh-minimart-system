import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropTypes from 'prop-types';

const PurchaseDialog = ({ 
  isOpen,
  onClose,
  onConfirm,
  itemName,
  pointsPerItem,
  isSubmitting,
  error,
  purchaseQuantity,
  onQuantityChange 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Purchase {itemName}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the quantity you would like to purchase. This will cost {pointsPerItem} points per item.
            </p>
          </div>

          <div>
            <Input
              type="number"
              value={purchaseQuantity}
              onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-500">
              Total points: {pointsPerItem * purchaseQuantity}
            </p>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Purchase'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

PurchaseDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  pointsPerItem: PropTypes.number.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  purchaseQuantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default PurchaseDialog;