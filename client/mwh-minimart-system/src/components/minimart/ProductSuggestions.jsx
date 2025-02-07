import PropTypes from 'prop-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

const ProductSuggestions = ({ currentProductId }) => {
  const products = {
    1: {
      id: 1,
      name: "Kinder Schoko-Bons White",
      image: "https://zegerman.sg/cdn/shop/files/kinderschoko-bonswhite200g.webp?v=1726040464&width=1200",
      point: 150,
      description: "Delicious white chocolate treats",
      quantity: 10
    },
    2: {
      id: 2,
      name: "Jack 'n Jill Potato Chips Extra Pedas",
      image: "https://thefoodcompany.sg/wp-content/uploads/2024/05/1-326.png",
      point: 120,
      description: "Spicy potato chips with intense flavor",
      quantity: 15
    },
    3: {
      id: 3,
      name: "Chippy Chilli & Cheese Corn Chips",
      image: "https://www.tastysnack.asia/cdn/shop/files/Jack_n_Jill-ChippyChili_CheeseFlavourCornChips_110g_90fbc312-b186-4f39-9289-ed60eba7db01_150x.png?v=1697186022",
      point: 100,
      description: "Crunchy corn chips with chili cheese",
      quantity: 20
    }
  };

  const recommendations = Object.values(products)
    .filter(product => product.id !== currentProductId);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8 relative">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4 px-4">
        Customers Also Bought
      </h3>
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex space-x-4 px-4" style={{ minWidth: "max-content" }}>
          {recommendations.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow flex-shrink-0" style={{ width: "400px" }}>
              <CardHeader className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <CardTitle className="text-xl font-semibold text-indigo-700">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {product.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                        {product.point} Points
                      </Badge>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-indigo-600">Stock:</span>{' '}
                        {product.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Purchase Voucher
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

ProductSuggestions.propTypes = {
  currentProductId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default ProductSuggestions;