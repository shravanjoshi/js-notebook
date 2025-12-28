import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Get auth token from localStorage
const getAuthToken = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        const parsedAuth = JSON.parse(auth);
        return parsedAuth.token;
    }
    return null;
};

// Configure axios with auth header
const getConfig = () => {
    const token = getAuthToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Get all notebooks
export const getNotebooks = async () => {
    try {
        // console.log('in notebooks');
        
        const { data } = await axios.get(`${API_URL}/notebooks`, getConfig());
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch notebooks';
    }
};


// Get default notebook
export const getDefaultNotebook = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/notebooks/default`, getConfig());
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch default notebook';
    }
};

// Get single notebook
export const getNotebook = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/notebooks/${id}`, getConfig());
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch notebook';
    }
};

// Create new notebook
export const createNotebook = async (title, cells) => {
    try {
        const { data } = await axios.post(`${API_URL}/notebooks`, { title, cells }, getConfig());
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create notebook';
    }
};

// Update notebook
export const updateNotebook = async (id, title, cells) => {
    try {
        const { data } = await axios.put(`${API_URL}/notebooks/${id}`, { title, cells }, getConfig());
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update notebook';
    }
};

// Delete notebook
export const deleteNotebook = async (id) => {
    try {
        const { data } = await axios.delete(`${API_URL}/notebooks/${id}`, getConfig());
        return data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete notebook';
    }
};
