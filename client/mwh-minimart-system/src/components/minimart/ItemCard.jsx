import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';

const ItemCard = ({ item }) => {
  const isOutOfStock = item.quantity === 0;

  return (
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
                {item.point} Points
              </Badge>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-indigo-600">Stock:</span>{' '}
                {item.quantity}
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
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => console.log(`Purchasing ${item.name}`)}
          >
            Purchase Item
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    product_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;