import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/v1", // Replace with your API base URL
  withCredentials: true, // Allow cookies to be sent in requests
});

axios.defaults.withCredentials = true;

export default axiosInstance;
