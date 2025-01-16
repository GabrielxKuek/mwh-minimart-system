import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to include the Firebase ID token in the request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const addUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const suspendUser = async (userId) => {
  const response = await api.put(`/users/${userId}/suspend`);
  return response.data;
};

export const reactivateUser = async (userId) => {
  const response = await api.put(`/users/${userId}/reactivate`);
  return response.data;
};

export const findUsers = async (criteria) => {
  const response = await api.get("/users/search", { params: criteria });
  return response.data;
};

export const getRequests = async () => {
  const response = await api.get("/requests");
  return response.data;
};

export const approveRequest = async (requestId) => {
  const response = await api.put(`/requests/${requestId}/approve`);
  return response.data;
};

export const rejectRequest = async (requestId) => {
  const response = await api.put(`/requests/${requestId}/reject`);
  return response.data;
};

// Inventory Management API Calls (Updated paths)
// Inventory Management API Calls
export const addProduct = async (productData) => {
  const response = await api.post("/inventory/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProduct = async (productId) => {
  const response = await api.get(`/inventory/products/${productId}`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get("/inventory/products");
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await api.put(`/inventory/products/${productId}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/inventory/products/${productId}`);
  return response.data;
};

export const getLowStockProducts = async (threshold) => {
  const response = await api.get(`/inventory/products/lowstock`, {
    params: { threshold },
  });
  return response.data;
};

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAchievements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/achievements`);
    if (!response.ok) {
      throw new Error(`Failed to fetch achievements: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching achievements:", error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  const response = await api.post("/tasks", taskData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

/////////////////////
// MINIMART SYSTEM //
/////////////////////

// get minimart products
export const getMinimartProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/minimart/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch minimart products: ${response.status}`);
    }

    const products = await response.json();

    return products;
    
  } catch (error) {
    console.error("Error fetching minimart products:", error);
    throw error;
  }
};

// insert transaction history (buying a product)
export const addTransaction = async (input_code, input_points_cost, input_products, userId) => {
  try {
    const quantity = input_products.reduce((total, product) => total + Object.values(product)[0], 0)

    const response = await fetch(`${API_BASE_URL}/minimart/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: input_code,
        points_cost: parseInt(input_points_cost),
        productId: input_products,
        status: "unclaimed",
        userId: userId,
        purchaseQuantity: quantity
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `Failed to complete transaction: ${response.status}`);
    }

    return data;
   
  } catch (error) {
    console.error("Error in transaction:", error);
    throw error;
  }
};

export const getCurrentPoints = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/points`);
    if (!response.ok) {
      throw new Error(`Failed to fetch current points: ${response.status}`);
    }
    const data = await response.json();
    return data.current_points;
   
  } catch (error) {
    console.error("Error fetching current points:", error);
    throw error;
  }
};

export const createRequest = async (product_id, quantity, userId) => {
  try {
    // Ensure proper prefixes are present
    const formattedProductId = product_id.startsWith('products/') ? product_id : `products/${product_id}`;
    const formattedUserId = userId.startsWith('users/') ? userId : `users/${userId}`;
   
    const response = await fetch(`${API_BASE_URL}/minimart/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        product_id: formattedProductId,
        quantity: parseInt(quantity),
        user_id: formattedUserId,
        status_id: "pending"  // Using string status instead of number
      })
    });

    const responseText = await response.text();
   
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Response was not JSON:', responseText);
      throw new Error('Invalid server response');
    }
    
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status: ${response.status}`);
    }
    return data;
   
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

////////////////////
// VOUCHER SYSTEM //
////////////////////

// get vouchers
export const getVoucherByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/voucher/userId`, {
      headers: {
        'userid': userId
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch vouchers: ${response.status}`);
    }
    const vouchers = await response.json();
    return vouchers;
   
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error;
  }
};

// get products from voucher
export const getVoucherProductById = async (voucherProducts) => {
  try {
    // Create an array of promises for each product request
    const productPromises = voucherProducts.map(async (productObj) => {
      const [productId, quantity] = Object.entries(productObj)[0];
      
      const response = await fetch(`${API_BASE_URL}/voucher/product/${productId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product ${productId}: ${response.status}`);
      }
      
      const product = await response.json();
      return {
        ...product,
        quantity: quantity
      };
    });

    const products = await Promise.all(productPromises);
    return products;
   
  } catch (error) {
    console.error("Error fetching voucher products:", error);
    throw error;
  }
};

export const getTotalUsers = async () => {
  const response = await api.get("/dashboard/data");
  return response.data.totalUsers;
};

export const getTotalPendingRequests = async () => {
  const response = await api.get("/dashboard/data");
  return response.data.totalPendingRequests;
};

export const getLowStockItems = async () => {
  const response = await api.get("/dashboard/data");
  return response.data.lowStockItems;
};

export const getRecentChanges = async () => {
  const response = await api.get("/dashboard/data");
  return response.data.recentChanges;
};

export const getApprovedRequests = async () => {
  const response = await api.get("/dashboard/data");
  return response.data.approvedRequests;
};

// Transaction Management API Calls
export const getTransactions = async () => {
  const response = await api.get("/transactions"); // No need for manual headers
  return response.data;
};

export const claimTransaction = async (transactionId, code) => {
  const response = await api.put("/transactions/claim", {
    transactionId,
    code,
  }); // No need for manual headers
  return response.data;
};


////////////////////
// NAVBAR //
////////////////////
