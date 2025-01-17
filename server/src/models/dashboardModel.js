const { db } = require("../configs/firebase");
const { collection, getDocs, query, where, orderBy, limit, doc, getDoc } = require("firebase/firestore");

const getTotalResidents = async () => {
  const usersRef = collection(db, "users");
  const residentsQuery = query(usersRef, where("role_id", "==", "resident"));
  const residentsSnapshot = await getDocs(residentsQuery);
  return residentsSnapshot.size;
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

  // Fetch recent changes from changelog collection
  const changelogRef = collection(db, "changelog");
  const changelogQuery = query(changelogRef, orderBy("timestamp", "desc"), limit(5));
  const changelogSnapshot = await getDocs(changelogQuery);
  changelogSnapshot.forEach(doc => {
    const data = doc.data();
    recentChanges.push({
      type: data.type,
      action: data.action,
      name: data.name,
      quantity: data.quantity,
      status: data.status,
      timestamp: data.timestamp,
    });
  });

  return recentChanges;
};

const getTotalPendingTasks = async () => {
  const userTasksRef = collection(db, "UserTask");
  const pendingTasksQuery = query(userTasksRef, where("status_id", "==", "pending"));
  const pendingTasksSnapshot = await getDocs(pendingTasksQuery);
  return pendingTasksSnapshot.size;
};

module.exports = {
  getTotalResidents,
  getTotalPendingRequests,
  getLowStockItems,
  getApprovedRequests,
  getRecentChanges,
  getTotalPendingTasks,
};