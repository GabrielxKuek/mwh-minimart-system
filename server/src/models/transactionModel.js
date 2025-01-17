const { db } = require("../configs/firebase");
const {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  getDoc,
} = require("firebase/firestore");

const getAllTransactions = async () => {
  const transactionsRef = collection(db, "transactions");
  const q = query(transactionsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  const transactions = [];
  querySnapshot.forEach((doc) => {
    transactions.push({ id: doc.id, ...doc.data() });
  });

  return transactions;
};

const getTransactionById = async (transactionId) => {
  const transactionRef = doc(db, "transactions", transactionId);
  const docSnapshot = await getDoc(transactionRef);

  if (!docSnapshot.exists()) {
    return null;
  }

  return { id: docSnapshot.id, ...docSnapshot.data() };
};

const updateTransactionStatus = async (transactionId, status) => {
  const transactionRef = doc(db, "transactions", transactionId);
  await updateDoc(transactionRef, { status });
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  updateTransactionStatus,
};
