import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';

const ItemCard = ({ item }) => {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold text-indigo-700">
            {item.name}
          </CardTitle>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
            {item.points} Points
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription className="text-sm text-gray-600">
          {item.description}
        </CardDescription>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-indigo-600">Category:</span>{' '}
          {item.category}
        </p>
      </CardContent>
    </Card>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCard;