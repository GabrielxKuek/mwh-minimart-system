import { useState, useEffect, useCallback } from "react";
import { getMinimartProducts, getCurrentPoints } from "../services/api";
import ItemCard from "../components/minimart/ItemCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import RequestProductForm from "../components/minimart/RequestProductForm";
import ProductSuggestions from "../components/minimart/ProductSuggestions";

const Minimart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
      if (response.length > 0) {
        setSelectedProductId(response[0].product_id);
      }
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
        <div className="flex items-center">
          <Button
            variant="default"
            className="mr-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
            onClick={() => setIsRequestFormOpen(true)}
          >
            Request Product
          </Button>
          <div className="flex items-center bg-white border border-indigo-200 rounded px-4 py-2 shadow-sm">
            <Coins className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-lg font-medium text-indigo-700">
              {currentPoints.toLocaleString()} Points
            </span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 px-4">
            Available Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard
                key={item.product_id}
                item={item}
                onPurchaseComplete={handlePurchaseComplete}
                onClick={() => setSelectedProductId(item.product_id)}
              />
            ))}
          </div>
         
          {selectedProductId && (
            <ProductSuggestions currentProductId={selectedProductId} />
          )}
        </>
      )}

      <RequestProductForm
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
      />
    </div>
  );
};

export default Minimart;