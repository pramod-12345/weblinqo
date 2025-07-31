import axios from 'axios';
import useUserStore from '../stores/userStore';

const api = axios.create({
  baseURL: 'https://api.weblinqo.com',
});

// ✅ Safe usage outside React component
api.interceptors.request.use(config => {
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      useUserStore.getState().resetAll(); // clear tokens & profile
      window.location.href = '/login'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
