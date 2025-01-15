import { useState } from "react";
import ProductList from "../components/inventory/ProductList";
import AddProductForm from "../components/inventory/AddProductForm";
import { Separator } from "@/components/ui/separator";

const InventoryManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleProductAdded = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Inventory Management
      </h1>
      <Separator className="my-4" />
      <div className="flex justify-end mb-4">
        <AddProductForm onProductAdd={handleProductAdded} />
      </div>
      <div className="rounded-lg border">
        <ProductList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default InventoryManagement;
