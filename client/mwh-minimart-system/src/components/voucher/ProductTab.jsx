import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';

const ProductTab = ({ productData }) => {
    const product = {
        name: "Product Name", // Replace with actual data
        description: "Product Description",
        imageUrl: "/placeholder.jpg",
        quantity: 10,
        point: 100
    };

    return (
        <Card className="border border-gray-200">
        <CardContent className="p-4">
            <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                src={product.imageUrl}
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
    productData: PropTypes.object.isRequired,  // Update with specific shape once data structure is known
};

export default ProductTab;