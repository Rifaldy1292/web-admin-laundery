// api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const postDataSignUp = async (data) => {
  try {
    const response = await apiClient.post("/v1/auth/register", data);
    console.log("api terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const postDataLogin = async (data) => {
  try {
    const response = await apiClient.post("/v1/auth/login", data);
    console.log("api terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const getDataProduct = async (bearerToken) => {
  try {
    const token = bearerToken;
    const response = await apiClient.get("v1/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const addNewProduct = async (bearerToken, data) => {
  try {
    const token = bearerToken;
    const response = await apiClient.post("/v1/products", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const deleteProduct = async (bearerToken, id) => {
  try {
    const token = bearerToken;
    // Menggunakan id pada URL, bukan pada body
    const response = await apiClient.delete(`/v1/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const editProduct = async (bearerToken, data) => {
  try {
    const token = bearerToken;
    // Menggunakan id pada URL, bukan pada body
    const response = await apiClient.put(`/v1/products`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const getDataPelanggan = async (bearerToken) => {
  try {
    const token = bearerToken;
    const response = await apiClient.get("v1/customers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const addNewPelanggan = async (bearerToken, data) => {
  try {
    const token = bearerToken;
    const response = await apiClient.post("/v1/customers", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const deletePelanggan = async (bearerToken, id) => {
  try {
    const token = bearerToken;
    // Menggunakan id pada URL, bukan pada body
    const response = await apiClient.delete(`/v1/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const editPelanggan = async (bearerToken, data) => {
  try {
    const token = bearerToken;
    // Menggunakan id pada URL, bukan pada body
    const response = await apiClient.put(`/v1/customers`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const getDataTransaction = async (bearerToken) => {
  try {
    const token = bearerToken;
    const response = await apiClient.get("/v1/bills", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const addNewTransaction = async (bearerToken, data) => {
  try {
    const token = bearerToken;
    const response = await apiClient.post("/v1/bills", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
export const getDataSpecificTransaction = async (bearerToken, id) => {
  try {
    const token = bearerToken;

    const response = await apiClient.get(`/v1/bills/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API terkirim");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
