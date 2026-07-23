import axios from 'axios';
import { PRODUCTS as mockProducts } from '../data/products'; // Update path if your file is located elsewhere (e.g., '../products')

const API_BASE_URL = 'http://localhost:8000/api';

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

        // If database is empty, return your local mock PRODUCTS list
        if (items.length === 0 && Array.isArray(mockProducts)) {
            return mockProducts;
        }

        return items;
    } catch (error) {
        console.error('API fetch failed, falling back to local PRODUCTS dataset:', error);
        // Fallback to local array if backend is offline or unreachable
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
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export default api;