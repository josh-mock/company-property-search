import axios from "axios";

const baseURL = import.meta.env.PROD ? "http://localhost:3000/api" : "/api";

export const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  },
);
