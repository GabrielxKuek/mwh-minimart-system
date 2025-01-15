import { useState, useEffect } from "react";
import { getMinimartProducts } from "../services/api";
import ItemCard from "../components/minimart/ItemCard";
import { Separator } from "@/components/ui/separator";

const Minimart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getMinimartProducts();
        setItems(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Minimart Catalog
      </h1>
      <Separator className="my-4" />

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard key={item.product_id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Minimart;