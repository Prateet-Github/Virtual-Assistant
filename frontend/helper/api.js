import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL 

export const API = async (question) => {
  const response = await axios.post(`${BACKEND_URL}/ask`, { question });
  return response.data; // { answer: "..." }
};