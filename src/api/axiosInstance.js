import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://admin.refabry.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
