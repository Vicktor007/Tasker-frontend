import axios from "axios";
export const BASE_URL= import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      // Add any other default headers here
    },
  });

  export const setAuthHeader = (token,api) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };