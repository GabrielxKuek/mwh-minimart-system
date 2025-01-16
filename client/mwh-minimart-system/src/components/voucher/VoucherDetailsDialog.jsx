import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ProductTab from './ProductTab';
import PropTypes from 'prop-types';

const VoucherDetailsDialog = ({ open, onOpenChange, voucher }) => {
    const getTotalQuantity = (productIdArray) => {
        return productIdArray.reduce((total, item) => {
            const quantity = Object.values(item)[0];
            return total + quantity;
        }, 0);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-indigo-700">
                        Voucher Details: {voucher.code}
                    </DialogTitle>
                </DialogHeader>
               
                <div className="mt-4 overflow-y-auto max-h-[60vh] pr-4">
                    <div className="space-y-4">
                        {/* Add general voucher info */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <span className="text-sm text-gray-600">Points Cost:</span>
                                <p className="font-medium text-indigo-700">{voucher.points_cost} points</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Quantity:</span>
                                <p className="font-medium text-indigo-700">{getTotalQuantity(voucher.productId)}</p>
                            </div>
                        </div>
                       
                        {/* Products Section */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                            <div className="space-y-4">
                                {voucher.productId.map((product, index) => (
                                    <ProductTab
                                        key={index}
                                        productData={product}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

VoucherDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    voucher: PropTypes.shape({
        code: PropTypes.string.isRequired,
        points_cost: PropTypes.number.isRequired,
        productId: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
};

export default VoucherDetailsDialog;