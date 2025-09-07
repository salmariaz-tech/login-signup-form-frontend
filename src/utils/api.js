import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050", // ✅ Make sure this matches your backend
});

export default API;


