// src/services/api.js
import axios from 'axios';
import { PRODUCTS as mockProducts } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ebuy-backend-latest.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access') || localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getProducts = async () => {
    try {
        const response = await api.get('/products/');
        const data = response.data;
        let items = [];

        if (Array.isArray(data)) items = data;
        else if (data && Array.isArray(data.results)) items = data.results;

        if (items.length === 0 && Array.isArray(mockProducts)) {
            return mockProducts;
        }

        return items;
    } catch (error) {
        // Fallback silently without throwing an unhandled console trace
        return Array.isArray(mockProducts) ? mockProducts : [];
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await api.post('/products/', productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/auth/profile/');
        return response.data;
    } catch (error) {
        // Return null silently to prevent 404 console tracking spam
        return null;
    }
};

export default api;