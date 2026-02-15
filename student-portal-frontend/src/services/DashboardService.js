import axios from "axios";

const BASE_URL = "http://localhost:8080/api/dashboard";

export const getDashboardStats = () => {
  return axios.get(`${BASE_URL}/stats`);
};