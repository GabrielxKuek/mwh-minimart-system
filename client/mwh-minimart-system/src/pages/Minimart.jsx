import { useState, useEffect } from "react";
import { getMinimartItems } from "../services/api";
import ItemCard from "../components/minimart/ItemCard";
import { Separator } from "@/components/ui/separator";
  

const Minimart = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getMinimartItems();
        setItems(response);

      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const categories = ["all", ...new Set(items.map(item => item.category.toLowerCase()))];
  
  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter(item => item.category.toLowerCase() === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Minimart Catalog
      </h1>
      
      <Separator className="my-4" />
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Separator className="my-4" />

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Minimart;