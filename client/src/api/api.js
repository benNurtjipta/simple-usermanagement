import axios from "axios";

// Configure Axios instance
const api = axios.create({
  baseURL: "http://localhost:3001/users", // Adjust this to your backend API URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
