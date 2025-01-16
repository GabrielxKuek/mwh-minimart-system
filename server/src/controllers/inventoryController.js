const inventoryModel = require("../models/inventoryModel");

const inventoryController = {
  async addProduct(req, res) {
    try {
      const productData = req.body;
      const file = req.file; // Assuming you use multer for file uploads

      if (!file) {
        return res.status(400).json({ message: "Product image is required" });
      }

      const newProduct = await inventoryModel.addProduct(productData, file);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProduct(req, res) {
    try {
      const { productId } = req.params;
      const product = await inventoryModel.getProductById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await inventoryModel.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const productData = req.body;
      const file = req.file;

      const updatedProduct = await inventoryModel.updateProduct(
        productId,
        productData,
        file
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      await inventoryModel.deleteProduct(productId);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getLowStockProducts(req, res) {
    try {
      const threshold = parseInt(req.query.threshold) || 10; // Default threshold of 10
      const lowStockProducts = await inventoryModel.getLowStockProducts(
        threshold
      );
      res.status(200).json(lowStockProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = inventoryController;