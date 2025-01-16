const { db } = require("../configs/firebase");
const { collection, getDocs, query, where, orderBy, limit, doc, getDoc } = require("firebase/firestore");

const getTotalUsers = async () => {
  const usersRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersRef);
  return usersSnapshot.size;
};

const getTotalPendingRequests = async () => {
  const requestsRef = collection(db, "requests");
  const pendingRequestsQuery = query(requestsRef, where("status_id", "==", "pending"));
  const pendingRequestsSnapshot = await getDocs(pendingRequestsQuery);
  return pendingRequestsSnapshot.size;
};

const getLowStockItems = async () => {
  const productsRef = collection(db, "products");
  const lowStockQuery = query(productsRef, where("quantity", "<=", 10)); // Assuming 10 is the threshold for low stock
  const lowStockSnapshot = await getDocs(lowStockQuery);
  return lowStockSnapshot.size;
};

const getRecentChanges = async () => {
  const recentChanges = [];

  // Fetch recent user changes
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, orderBy("updated_at", "desc"), limit(5));
  const usersSnapshot = await getDocs(usersQuery);
  usersSnapshot.forEach(doc => {
    recentChanges.push({
      type: "User",
      name: doc.data().name,
      status: doc.data().status_id,
      updated_at: doc.data().updated_at,
    });
  });

  // Fetch recent request changes
  const requestsRef = collection(db, "requests");
  const requestsQuery = query(requestsRef, orderBy("updated_at", "desc"), limit(5));
  const requestsSnapshot = await getDocs(requestsQuery);
  for (const requestDoc of requestsSnapshot.docs) {
    const requestData = requestDoc.data();
    const userId = requestData.user_id.split('/').pop(); // Extract user ID from the user_id field
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    recentChanges.push({
      type: "Request",
      name: userDoc.exists() ? userDoc.data().name : "Unknown User",
      status: requestData.status_id,
      updated_at: requestData.updated_at,
    });
  }

  // Fetch recent product changes
  const productsRef = collection(db, "products");
  const productsQuery = query(productsRef, orderBy("updated_at", "desc"), limit(5));
  const productsSnapshot = await getDocs(productsQuery);
  productsSnapshot.forEach(doc => {
    recentChanges.push({
      type: "Product",
      name: doc.data().name,
      quantity: doc.data().quantity,
      updated_at: doc.data().updated_at,
    });
  });

  // Sort by updated_at timestamp
  recentChanges.sort((a, b) => b.updated_at - a.updated_at);

  return recentChanges;
};

module.exports = {
  getTotalUsers,
  getTotalPendingRequests,
  getLowStockItems,
  getRecentChanges,
};