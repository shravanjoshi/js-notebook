import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
    });
    const [loading, setLoading] = useState(true);

    // Configure axios defaults.
    // The base URL is now read from Vite's env variable
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                user: parsedData.user,
                token: parsedData.token,
            });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // console.log('in login');

            const { data } = await axios.post('/auth/login', { email, password });
            const authData = { user: { name: data.name, email: data.email }, token: data.token };
            setAuth(authData);
            // console.log(data);

            localStorage.setItem('auth', JSON.stringify(authData));
            return data;
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
            throw new Error(error.response.data.message);
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/auth/register', { name, email, password });
            const authData = { user: { name: data.name, email: data.email }, token: data.token };
            setAuth(authData);
            localStorage.setItem('auth', JSON.stringify(authData));
            return data;
        } catch (error) {
            console.error('Registration failed:', error.response.data.message);
            throw new Error(error.response.data.message);
        }
    };


    const logout = () => {
        setAuth({ user: null, token: '' });
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};