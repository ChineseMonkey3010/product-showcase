import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';
const TIMEOUT = 10000; 

const api = axios.create({
  baseURL: API_BASE,
  timeout: TIMEOUT,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

export const getProducts = async (limit = 5) => {
  try {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return [
      {
        id: 1,
        title: "Fake Product 1",
        price: 99.99,
        category: "electronics",
        description: "This is a fallback product description",
        image: "/placeholder.jpg",
        rating: { rate: 4.5, count: 120 }
      },
      {
        id: 2,
        title: "Fake Product 2",
        price: 49.99,
        category: "jewelery",
        description: "This is a fallback product description",
        image: "/placeholder.jpg",
        rating: { rate: 4.0, count: 85 }
      }
    ];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      id: id,
      title: `Product #${id} (API Error)`,
      price: 0,
      category: "error",
      description: "The API is currently unavailable. Please try again later.",
      image: "/placeholder.jpg",
      rating: { rate: 0, count: 0 }
    };
  }
};