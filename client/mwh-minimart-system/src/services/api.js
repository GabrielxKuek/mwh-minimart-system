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
export const addProduct = async (productData) => {
  const response = await api.post("/inventory/products", productData, {
    // Updated path
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProduct = async (productId) => {
  const response = await api.get(`/inventory/products/${productId}`); // Updated path
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get("/inventory/products"); // Updated path
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await api.put(
    `/inventory/products/${productId}`,
    productData,
    {
      // Updated path
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/inventory/products/${productId}`); // Updated path
  return response.data;
};

export const getLowStockProducts = async (threshold) => {
  const response = await api.get(`/inventory/products/lowstock`, {
    // Updated path
    params: { threshold },
  });
  return response.data;
};

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`); // Update the URL to /api/leaderboard
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to handle in component
  }
};

export const getAchievements = async () => {
  try {
    // Make a GET request to your server's API endpoint for achievements.
    const response = await fetch(`${API_BASE_URL}/achievements`);

    // Check if the response was successful (status code 200-299).
    if (!response.ok) {
      // If not successful, throw an error with a message. You can customize
      // the error message based on the response status code if needed.
      throw new Error(`Failed to fetch achievements: ${response.status}`);
    }

    // Parse the response body as JSON.
    const achievements = await response.json();

    // Return the fetched achievements data.
    return achievements;
  } catch (error) {
    // Log the error to the console for debugging purposes.
    console.error("Error fetching achievements:", error);

    // You can either:
    // 1. Return an empty array or some default value to indicate failure:
    // return [];
    // 2. Or, re-throw the error to be handled by the caller:
    throw error;
  }
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
export const enterTransaction = async (input_code, input_points_cost, input_products) => {
  try {
    const response = await fetch(`${API_BASE_URL}/minimart/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: input_code,
        points_cost: parseInt(input_points_cost), // Ensure it's a number
        productId: input_products,
        status: "unclaimed",
        userId: "3rrxuSJYEFH3uT5TkApi",
        purchaseQuantity: 1
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