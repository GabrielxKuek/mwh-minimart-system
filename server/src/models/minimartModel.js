// this file just for you guys' reference. i made in year 1, might not be v optimised LOL
// also since we using firebase its not accurate HAHAHAHA

const { collection, addDoc, getDocs } = require('firebase/firestore');
const { db } = require("../configs/firebase");

// config
const transactionCollection = collection(db, "transactions");

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