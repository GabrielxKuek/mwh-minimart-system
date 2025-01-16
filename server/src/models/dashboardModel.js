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

const getApprovedRequests = async () => {
  const requestsRef = collection(db, "requests");
  const approvedRequestsQuery = query(requestsRef, where("status_id", "==", "approved"));
  const approvedRequestsSnapshot = await getDocs(approvedRequestsQuery);

  const productQuantities = {};

  for (const requestDoc of approvedRequestsSnapshot.docs) {
    const requestData = requestDoc.data();
    const productId = requestData.product_id.split('/').pop(); // Extract product ID
    const quantity = requestData.quantity;

    if (!productQuantities[productId]) {
      productQuantities[productId] = 0;
    }
    productQuantities[productId] += quantity;
  }

  const productQuantitiesArray = [];

  for (const productId in productQuantities) {
    const productDocRef = doc(db, "products", productId);
    const productDoc = await getDoc(productDocRef);
    if (productDoc.exists()) {
      productQuantitiesArray.push({
        name: productDoc.data().name,
        quantity: productQuantities[productId],
      });
    }
  }

  return productQuantitiesArray;
};

const getRecentChanges = async () => {
  const recentChanges = [];

  // Fetch recent user changes
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, orderBy("updated_at", "desc"), limit(5));
  const usersSnapshot = await getDocs(usersQuery);
  usersSnapshot.forEach(doc => {
    const data = doc.data();
    let action = "updated";
    if (data.status_id === "suspended") {
      action = "suspended";
    } else if (data.status_id === "active") {
      action = "reactivated";
    }
    if (data.created_at && data.created_at.seconds === data.updated_at.seconds) {
      action = "added";
    }
    recentChanges.push({
      type: "User",
      action,
      name: data.name,
      updated_at: data.updated_at,
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
    const userName = userDoc.exists() ? userDoc.data().name : "Unknown User";
    let action = "updated";
    if (requestData.status_id === "approved") {
      action = "approved";
    } else if (requestData.status_id === "rejected") {
      action = "rejected";
    }
    recentChanges.push({
      type: "Request",
      action,
      name: userName,
      updated_at: requestData.updated_at,
    });
  }

  // Fetch recent product changes
  const productsRef = collection(db, "products");
  const productsQuery = query(productsRef, orderBy("updated_at", "desc"), limit(5));
  const productsSnapshot = await getDocs(productsQuery);
  productsSnapshot.forEach(doc => {
    const data = doc.data();
    let action = "updated";
    if (data.created_at && data.created_at.seconds === data.updated_at.seconds) {
      action = "added";
    }
    recentChanges.push({
      type: "Product",
      action,
      name: data.name,
      updated_at: data.updated_at,
    });
  });

  // Sort by updated_at timestamp
  recentChanges.sort((a, b) => b.updated_at.seconds - a.updated_at.seconds);

  return recentChanges;
};

module.exports = {
  getTotalUsers,
  getTotalPendingRequests,
  getLowStockItems,
  getApprovedRequests,
  getRecentChanges,
};