import axios from "axios";
const baseURL = process.env.BACKEND_URL;

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});

api.interceptors.request.use(function(config) {
  const token = null;

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
