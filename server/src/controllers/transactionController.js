const { db } = require("../configs/firebase");
const {
  collection,
  getDocs,
  doc,
  where,
  getDoc,
} = require("firebase/firestore");
const transactionModel = require("../models/transactionModel");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.getAllTransactions();

    // Fetch user and product details for each transaction
    const transactionsWithDetails = await Promise.all(
      transactions.map(async (transaction) => {
        // Fetch user details
        const userQuerySnapshot = await getDocs(
          collection(db, "users"),
          where("transactionId", "!=", null),
          where("transactionId", "array-contains", transaction.id)
        );
        let user = null;
        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          user = {
            name: userData.name,
            email: userData.email,
            nric: userData.nric,
          };
        }

        // Fetch product details

        const products = await Promise.all(
          transaction.productId.map(async (productRef) => {
            // Extract product ID (key) and quantity (value) from the map
            const productKey = Object.keys(productRef)[0]; // Get the first key
            const productQuantity = productRef[productKey];

            if (productKey) {
              const productSnapshot = await getDoc(
                doc(db, "products", productKey)
              );
              if (productSnapshot.exists()) {
                return {
                  name: productSnapshot.data().name,
                  quantity: productQuantity, // Use the extracted quantity
                };
              } else {
                return null;
              }
            } else {
              return null;
            }
          })
        );

        return {
          ...transaction,
          user,
          products: products.filter((p) => p !== null), // Remove null products
        };
      })
    );

    res.status(200).json(transactionsWithDetails);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId, code } = req.body;
    const transaction = await transactionModel.getTransactionById(
      transactionId
    );

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.code !== code) {
      return res.status(400).json({ error: "Incorrect code" });
    }

    await transactionModel.updateTransactionStatus(transactionId, "claimed");
    res.status(200).json({ message: "Transaction status updated" });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ error: "Failed to update transaction status" });
  }
};

module.exports = {
  getAllTransactions,
  updateTransactionStatus,
};
