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
