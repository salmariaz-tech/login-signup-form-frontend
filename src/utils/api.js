import axios from "axios";

const API = axios.create({
  baseURL: "https://login-signup-form-server-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;






