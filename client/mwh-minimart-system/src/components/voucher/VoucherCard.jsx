import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Package } from "lucide-react";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import VoucherDetailsDialog from './VoucherDetailsDialog';
import { getVoucherProductById } from "../../services/api";

const formatDateTime = (timestamp) => {
    try {
        const date = new Date(timestamp.seconds * 1000);
       
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Invalid date';
    }
};

const VoucherCard = ({ voucher }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productDetails = await getVoucherProductById(voucher.productId);
                setProducts(productDetails);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [voucher.productId]);

    const getTotalQuantity = (productIdArray) => {
        return productIdArray.reduce((total, item) => {
            const quantity = Object.values(item)[0];
            return total + quantity;
        }, 0);
    };

    const isClaimed = voucher.status === "claimed";
    const cardClassName = `h-full flex flex-col ${isClaimed ? 'opacity-60 bg-gray-50' : ''}`;

    return (
        <>
            <Card className={cardClassName}>
                <CardHeader className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                        <CardTitle className={`text-xl font-semibold ${isClaimed ? 'text-gray-500' : 'text-indigo-700'}`}>
                            {voucher.code}
                        </CardTitle>
                        <Badge
                            variant="secondary"
                            className={
                                isClaimed
                                    ? 'bg-gray-100 text-gray-500'
                                    : 'bg-indigo-100 text-indigo-700'
                            }
                        >
                            {voucher.status}
                        </Badge>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className={`h-4 w-4 ${isClaimed ? 'text-gray-400' : 'text-indigo-500'}`} />
                                <span>Created</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 pl-6">
                                {formatDateTime(voucher.createdAt)}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Package className={`h-4 w-4 ${isClaimed ? 'text-gray-400' : 'text-indigo-500'}`} />
                                <span>Products</span>
                            </div>
                            {loading ? (
                                <div className="pl-2 text-sm text-gray-400">Loading products...</div>
                            ) : (
                                <ul className="pl-6 space-y-1 mt-1">
                                    {products.map((product, index) => (
                                        <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
                                            <span>{product.name}</span>
                                            <span className="text-gray-500">x{Object.values(voucher.productId[index])[0]}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="outline"
                        className={`w-full ${
                            isClaimed 
                                ? 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                : 'border-indigo-200 hover:bg-indigo-50'
                        }`}
                        onClick={() => setShowDetails(true)}
                    >
                        View Details
                    </Button>
                </CardContent>
            </Card>
            <VoucherDetailsDialog
                open={showDetails}
                onOpenChange={setShowDetails}
                voucher={voucher}
            />
        </>
    );
};

VoucherCard.propTypes = {
    voucher: PropTypes.shape({
        code: PropTypes.string.isRequired,
        createdAt: PropTypes.shape({
            seconds: PropTypes.number.isRequired,
            nanoseconds: PropTypes.number.isRequired
        }).isRequired,
        status: PropTypes.string.isRequired,
        productId: PropTypes.arrayOf(PropTypes.object).isRequired,
        points_cost: PropTypes.number.isRequired,
        purchaseQuantity: PropTypes.number,
        userId: PropTypes.string,
    }).isRequired,
};

export default VoucherCard;