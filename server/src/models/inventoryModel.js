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
  deleteObject,
} = require("firebase/storage");
const db = getFirestore();
const storage = getStorage();

const inventoryModel = {
  async addProduct(productData, file) {
    try {
      const storageRef = ref(
        storage,
        `product_images/${Date.now()}_${file.originalname}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file.buffer);
      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(snapshot.ref);

      const productRef = doc(collection(db, "products"));
      await setDoc(productRef, {
        ...productData,
        imageUrl,
        quantity: parseInt(productData.quantity),
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
        return null;
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

      let imageUrl = productData.imageUrl;
      if (file) {
        // Delete the old image if it exists
        if (imageUrl) {
          const oldImageRef = ref(storage, imageUrl);
          await deleteObject(oldImageRef);
        }

        const storageRef = ref(
          storage,
          `product_images/${Date.now()}_${file.originalname}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      console.log("Updating product in Firestore with ID:", productId);
      console.log("Updated product data:", { ...productData, imageUrl });

      const updateData = { ...productData };
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      } else {
        delete updateData.imageUrl;
      }

      await updateDoc(productRef, updateData);
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