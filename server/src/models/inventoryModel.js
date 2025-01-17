const { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, addDoc, query, where } = require("firebase/firestore");
const { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } = require("firebase/storage");
const { db } = require("../configs/firebase");

const productCollection = collection(db, "products");
const changelogCollection = collection(db, "changelog");
const storage = getStorage();

const inventoryModel = {
  async addProduct(productData, file) {
    try {
      const storageRef = ref(storage, `product_images/${file.originalname}`);
      const uploadTask = uploadBytesResumable(storageRef, file.buffer);
      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(snapshot.ref);

      const productRef = await addDoc(productCollection, {
        ...productData,
        imageUrl,
        quantity: parseInt(productData.quantity),
        point: parseInt(productData.point),
      });

      // Log the add action
      await addDoc(changelogCollection, {
        type: "Product",
        action: "added",
        name: productData.name,
        quantity: parseInt(productData.quantity),
        timestamp: new Date(),
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
      const productsSnap = await getDocs(productCollection);
      const products = productsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
          const pathStartIndex = imageUrl.indexOf("/o/") + 3;
          const pathEndIndex = imageUrl.indexOf("?alt=media");
          const oldImagePath = decodeURIComponent(imageUrl.substring(pathStartIndex, pathEndIndex));
          console.log("Old image path:", oldImagePath); // Add logging here
          const oldImageRef = ref(storage, oldImagePath);

          // Check if the old image exists before attempting to delete it
          try {
            await getMetadata(oldImageRef);
            await deleteObject(oldImageRef);
            console.log("Old image deleted:", oldImagePath); // Add logging here
          } catch (error) {
            if (error.code === 'storage/object-not-found') {
              console.warn(`Old image not found: ${oldImagePath}`); // Log a warning if the old image does not exist
            } else {
              throw error; // Re-throw the error if it's not a "not found" error
            }
          }
        }

        const storageRef = ref(storage, `product_images/${file.originalname}`);
        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      console.log("Updating product in Firestore with ID:", productId); // Add logging here
      console.log("Updated product data:", { ...productData, imageUrl }); // Add logging here

      const updateData = { ...productData };
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      } else {
        delete updateData.imageUrl; // Remove imageUrl field if it's undefined or empty
      }

      await updateDoc(productRef, updateData);

      // Log the update action
      await addDoc(changelogCollection, {
        type: "Product",
        action: "edited",
        name: productData.name,
        quantity: parseInt(productData.quantity),
        timestamp: new Date(),
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
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        throw new Error("Product not found");
      }

      const productData = productSnap.data();
      const imageUrl = productData.imageUrl;

      // Delete the image from storage if it exists
      if (imageUrl) {
        const pathStartIndex = imageUrl.indexOf("/o/") + 3;
        const pathEndIndex = imageUrl.indexOf("?alt=media");
        const imagePath = decodeURIComponent(imageUrl.substring(pathStartIndex, pathEndIndex));
        console.log("Image path to delete:", imagePath); // Add logging here
        const imageRef = ref(storage, imagePath);

        // Check if the image exists before attempting to delete it
        try {
          await getMetadata(imageRef);
          await deleteObject(imageRef);
          console.log("Image deleted:", imagePath); // Add logging here
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            console.warn(`Image not found: ${imagePath}`); // Log a warning if the image does not exist
          } else {
            throw error; // Re-throw the error if it's not a "not found" error
          }
        }
      }

      await deleteDoc(productRef);
      console.log("Product deleted from Firestore with ID:", productId); // Add logging here

      // Log the delete action
      await addDoc(changelogCollection, {
        type: "Product",
        action: "deleted",
        name: productData.name,
        quantity: parseInt(productData.quantity),
        timestamp: new Date(),
      });

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