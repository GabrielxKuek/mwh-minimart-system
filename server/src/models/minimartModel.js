// this file just for you guys' reference. i made in year 1, might not be v optimised LOL
// also since we using firebase its not accurate HAHAHAHA

const { collection, doc, addDoc, getDoc, getDocs, updateDoc } = require('firebase/firestore');
const { db } = require("../configs/firebase");

// config
const transactionCollection = collection(db, "transactions");
const requestCollection = collection(db, "requests");

module.exports.selectAllProducts = async () => {
    try {
        // Reference to the products collection
        const productsRef = collection(db, "products");
        
        // Get all documents from the collection
        const snapshot = await getDocs(productsRef);
        
        // Map through the documents to get their data and IDs
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

module.exports.insertTransaction = async (data) => {
    try {
        const docRef = await addDoc(transactionCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding transaction:", error);
        throw error;
    }
}

module.exports.decrementUserPoints = async (userId, points_cost) => {
    try {
        // Reference to the specific user document
        const userRef = doc(db, "users", userId);
        
        // Get current user data to check points
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            throw new Error("User not found");
        }

        const userData = userSnap.data();
        const currentPoints = userData.current_points;

        // Check if user has enough points
        if (currentPoints < points_cost) {
            throw new Error("Insufficient points");
        }

        // Update the user's points
        await updateDoc(userRef, {
            current_points: currentPoints - points_cost
        });

        return {
            success: true,
            updatedPoints: currentPoints - points_cost
        };
    } catch (error) {
        console.error("Error decrementing user points:", error);
        throw error;
    }
};

module.exports.decrementProductQuantity = async (productId, purchaseQuantity) => {
    try {
        // Ensure productId is a string
        // const productDocId = String(productId); 
        const productDocId = "zZplkwEvX17jr7Vp8R5c";
        
        // Create document reference
        const productRef = doc(db, "products", productDocId);
        
        // Get current product data
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
            throw new Error("Product not found");
        }

        const productData = productSnap.data();
        const currentQuantity = parseInt(productData.quantity);
        const quantityToDeduct = parseInt(purchaseQuantity);

        // Check if product has enough stock
        if (currentQuantity < quantityToDeduct) {
            throw new Error("Insufficient stock available");
        }

        // Update the product's quantity
        const newQuantity = currentQuantity - quantityToDeduct;
        await updateDoc(productRef, {
            quantity: newQuantity
        });

        return {
            success: true,
            productId: productDocId,
            updatedQuantity: newQuantity
        };
    } catch (error) {
        console.error("Error decrementing product quantity:", error);
        throw error;
    }
};

module.exports.insertRequest = async (data) => {
    try {
        const docRef = await addDoc(requestCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding request:", error);
        throw error;
    }
}