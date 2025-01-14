// server/src/models/inventoryModel.js
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} = require("firebase/firestore");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const db = getFirestore();
const storage = getStorage();

const inventoryModel = {
  async addProduct(productData, file) {
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(
        storage,
        `product_images/${Date.now()}_${file.originalname}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file.buffer);

      // Get image URL after upload
      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Add product to Firestore
      const productRef = doc(collection(db, "products"));
      await setDoc(productRef, {
        ...productData,
        imageUrl,
        quantity: parseInt(productData.quantity), // Ensure quantity is a number
        point: parseInt(productData.point),
      });

      return { id: productRef.id, ...productData, imageUrl };
    } catch (error) {
      console.error("Error adding product:", error);
      throw new Error("Failed to add product");
    }
  },

  async getProductById(productId) {
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        return null; // Product not found
      }

      return { id: productSnap.id, ...productSnap.data() };
    } catch (error) {
      console.error("Error getting product:", error);
      throw new Error("Failed to get product");
    }
  },

  async getAllProducts() {
    try {
      const productsRef = collection(db, "products");
      const productsSnap = await getDocs(productsRef);

      const products = [];
      productsSnap.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      return products;
    } catch (error) {
      console.error("Error getting all products:", error);
      throw new Error("Failed to get all products");
    }
  },

  async updateProduct(productId, productData, file) {
    try {
      const productRef = doc(db, "products", productId);

      // Handle image update if a new file is provided
      let imageUrl = productData.imageUrl; // Keep existing URL by default
      if (file) {
        const storageRef = ref(
          storage,
          `product_images/${Date.now()}_${file.originalname}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file.buffer);

        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(productRef, {
        ...productData,
        imageUrl,
        quantity: parseInt(productData.quantity),
        point: parseInt(productData.point),
      });

      return { id: productId, ...productData, imageUrl };
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  },

  async deleteProduct(productId) {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      return { id: productId };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  },

  async getLowStockProducts(threshold) {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("quantity", "<=", threshold));
      const querySnapshot = await getDocs(q);

      const lowStockProducts = [];
      querySnapshot.forEach((doc) => {
        lowStockProducts.push({ id: doc.id, ...doc.data() });
      });

      return lowStockProducts;
    } catch (error) {
      console.error("Error getting low stock products:", error);
      throw new Error("Failed to get low stock products");
    }
  },
};

module.exports = inventoryModel;
