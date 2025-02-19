import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const items = [
  { name: "Sour Patch", image: "/src/assets/sour-patch.jpg" },
  { name: "Indomie", image: "/src/assets/indomie.jpg" },
  { name: "Boncabe", image: "/src/assets/boncabe.jpg" },
];

const RequestProductForm = ({ isOpen, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(items[0].name);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Requested item:", selectedItem, "Quantity:", quantity);
    onClose();
  };

  const selectedItemImage = items.find(item => item.name === selectedItem)?.image;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-md min-h-[400px]">
        <DialogHeader>
          <DialogTitle>Request Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 mb-8">
              <Label htmlFor="item" className="text-right">
                Item
              </Label>
              <div className="col-span-3 flex items-center">
                {selectedItemImage && (
                  <img src={selectedItemImage} alt={selectedItem} className="w-20 h-20 mr-4 object-cover rounded-md" />
                )}
                <Select
                  value={selectedItem}
                  onValueChange={setSelectedItem}
                  className="w-full"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3 rounded-md"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestProductForm;