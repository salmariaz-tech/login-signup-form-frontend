import axios from "axios";

const api = axios.create({
  baseURL: "https://login-signup-form-server-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ CORS ke liye important
});

export default api;
