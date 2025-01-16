const { collection, getDocs } = require('firebase/firestore');
const { db } = require("../configs/firebase");

module.exports.selectVoucherByAll = async () => {
    try {
        // Reference to the products collection
        const transactionsRef = collection(db, "transactions");
        
        // Get all documents from the collection
        const snapshot = await getDocs(transactionsRef);
        
        // Map through the documents to get their data and IDs
        const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        return transactions;

    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

module.exports.selectVoucherProductById = async (productId) => {
    try {
        // Reference to the products collection
        const productRef = doc(db, "products", productId);
        
        // Get the document
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
            throw new Error("Product not found");
        }

        return { id: productSnap.id, ...productSnap.data() };

    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}