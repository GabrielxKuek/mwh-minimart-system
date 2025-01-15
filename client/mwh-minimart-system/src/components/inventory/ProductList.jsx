import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllProducts,
  deleteProduct,
  getLowStockProducts,
} from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { Search, ChevronDown, AlertTriangle } from "lucide-react";
import EditProductForm from "./EditProductForm";

const ProductList = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState(false);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const fetchLowStockProducts = async () => {
    const data = await getLowStockProducts(10); // Set your low stock threshold here
    setLowStockAlert(data.length > 0);
  };

  useEffect(() => {
    fetchProducts();
    fetchLowStockProducts();
  }, [refreshTrigger]);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleProductEdit = () => {
    // Trigger a refresh of the product list
    fetchProducts();
  };

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Low Stock Alert */}
      {lowStockAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" />
          <span className="font-bold">Low Stock Alert!</span> Some products are
          running low on stock.
        </div>
      )}

      <div className="mb-4 flex items-center">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name, description, ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 rounded-md"
          />
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Description</TableHead>
              <TableHead className="font-medium">Quantity</TableHead>
              <TableHead className="font-medium">Point</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.point}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-8 p-0 rounded-md">
                        <span className="sr-only">Open</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 rounded-md" align="end">
                      <div className="grid gap-4 p-2">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            {product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                        <Separator />
                        <div className="grid gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full rounded-lg"
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-lg">
                              <DialogHeader>
                                <DialogTitle>Product Details</DialogTitle>
                                <DialogDescription>
                                  Details for {product.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-1 p-2">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-40 w-40 object-cover rounded-md mx-auto"
                                />
                                <p>
                                  <strong>Name:</strong> {product.name}
                                </p>
                                <p>
                                  <strong>Description:</strong>{" "}
                                  {product.description}
                                </p>
                                <p>
                                  <strong>Quantity:</strong> {product.quantity}
                                </p>
                                <p>
                                  <strong>Point:</strong> {product.point}
                                </p>
                              </div>
                              <DialogFooter>
                                <DialogTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    className="rounded-md"
                                  >
                                    Close
                                  </Button>
                                </DialogTrigger>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <EditProductForm
                            product={product}
                            onProductEdit={handleProductEdit}
                          />
                          <Button
                            variant="destructive"
                            className="w-full rounded-md"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
ProductList.propTypes = {
  refreshTrigger: PropTypes.any.isRequired,
};

export default ProductList;
