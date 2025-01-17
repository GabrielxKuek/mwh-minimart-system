import { useState, useEffect, useCallback } from "react";
import { getMinimartProducts, getCurrentPoints } from "../services/api";
import ItemCard from "../components/minimart/ItemCard";
import { Separator } from "@/components/ui/separator";
import { Coins } from "lucide-react";

const Minimart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  const fetchPoints = useCallback(async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const points = await getCurrentPoints(userId);
      setCurrentPoints(points);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }, []);

  const fetchItems = useCallback(async () => {
    try {
      const response = await getMinimartProducts();
      setItems(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchPoints();
  }, [fetchItems, fetchPoints]);

  const handlePurchaseComplete = async (productId) => {
    setLoading(true);
    await Promise.all([fetchItems(), fetchPoints()]);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          Minimart Catalog
        </h1>
        <div className="flex items-center bg-white border border-indigo-200 rounded px-4 py-2 shadow-sm">
          <Coins className="w-5 h-5 text-indigo-600 mr-2" />
          <span className="text-lg font-medium text-indigo-700">
            {currentPoints.toLocaleString()} Points
          </span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard
              key={item.product_id}
              item={item}
              onPurchaseComplete={handlePurchaseComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Minimart;