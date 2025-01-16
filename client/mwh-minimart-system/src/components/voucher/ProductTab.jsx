import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getVoucherProductById } from "../../services/api";

const ProductTab = ({ productData }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productDetails = await getVoucherProductById([productData]);
                setProduct(productDetails[0]); // Take first item since we're only fetching one product
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productData]);

    if (loading) {
        return (
            <Card className="border border-gray-200">
                <CardContent className="p-4">
                    <div className="flex gap-4 items-center justify-center h-24">
                        <span className="text-gray-500">Loading product details...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border border-gray-200">
                <CardContent className="p-4">
                    <div className="flex gap-4 items-center justify-center h-24">
                        <span className="text-red-500">Error loading product: {error}</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!product) {
        return (
            <Card className="border border-gray-200">
                <CardContent className="p-4">
                    <div className="flex gap-4 items-center justify-center h-24">
                        <span className="text-gray-500">No product data available</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border border-gray-200">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={product.imageUrl || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                                {product.point} Points
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="text-sm">
                            <span className="text-gray-600">Quantity:</span>{' '}
                            <span className="font-medium text-gray-900">{product.quantity}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

ProductTab.propTypes = {
    productData: PropTypes.shape({
        [PropTypes.string]: PropTypes.number
    }).isRequired,
};

export default ProductTab;