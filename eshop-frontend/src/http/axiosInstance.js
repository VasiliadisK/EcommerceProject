import axios from 'axios';

//creates an axios instance with the base URL and credentials configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
});

export default api;