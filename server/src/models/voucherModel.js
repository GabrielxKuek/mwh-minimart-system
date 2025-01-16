const { collection, getDoc, getDocs, doc, query, where } = require('firebase/firestore');
const { db } = require("../configs/firebase");

module.exports.selectVoucherByUserId = async (userId) => {
    try {
        // Reference to the transactions collection
        const transactionsRef = collection(db, "transactions");
        
        // Create a query where userId matches the input userId
        const q = query(transactionsRef, where("userId", "==", userId));
        
        // Get filtered documents
        const snapshot = await getDocs(q);
        
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