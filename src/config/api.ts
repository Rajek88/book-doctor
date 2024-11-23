import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
// const API_BASE_URL = "https://book-doctor-be.vercel.app";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/appointments`,
});
