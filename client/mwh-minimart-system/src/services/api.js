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
  const response = await api.put(
    `/inventory/products/${productId}`,
    productData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
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