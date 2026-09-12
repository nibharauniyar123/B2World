

// export default instance;
import axios from "axios";
const instance = axios.create({
  baseURL: 'http://localhost:5000',   // Backend port - change if different
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;