import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:5001';
     axios.defaults.withCredentials = true;  // Important for cookies

    // Request interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh-token')) {
          originalRequest._retry = true;
          try {
            const response = await axios.post('/api/auth/refresh-token', { withCredentials: true });
            setUser('dd')
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            setUser(null);
            navigate('/login');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    checkAuth();
    
  }, []);

const fetchEvents = async () => {
  try {
    const response = await axios.get('/api/events');
    console.log(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data) {
        setUser({
          id: response.data._id,
          email: response.data.email,
          role: response.data.role
        });
        console.log('User authenticated:', response.data.email);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      if (response.data && response.data.user && response.data.accessToken) {
        setUser(response.data.user);
        localStorage.setItem('accessToken', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        toast.success('Registration successful!');
        navigate('/');
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
     
      if (response.data && response.data.user && response.data.accessToken) {
        setUser(response.data.user);
        localStorage.setItem('accessToken', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        toast.success('Successfully logged in!');
        navigate('/');
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common['Authorization'];
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    }
  };


  
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    fetchEvents,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};