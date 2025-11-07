import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';

export const getProducts = async (limit = 5) => {
  const response = await axios.get(`${API_BASE}/products?limit=${limit}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE}/products/${id}`);
  return response.data;
};