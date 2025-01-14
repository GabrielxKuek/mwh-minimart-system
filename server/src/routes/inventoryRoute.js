// server/src/routes/inventoryRoute.js
const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory
const firebaseAuthMiddleware = require("../middlewares/firebaseAuthMiddleware");

// Add a new product (with image upload)
router.post(
  "/products",
  upload.single("image"),
  inventoryController.addProduct
);

// Get a specific product by ID
router.get("/products/:productId", inventoryController.getProduct);

// Get all products
router.get("/products", inventoryController.getAllProducts);

// Update a product (with optional image update)
router.put(
  "/products/:productId",
  upload.single("image"),
  inventoryController.updateProduct
);

// Delete a product
router.delete("/products/:productId", inventoryController.deleteProduct);

// Get low stock products
router.get("/products/lowstock", inventoryController.getLowStockProducts);

module.exports = router;
