import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const sendMessage = (message, token) =>
  axios.post(`${API_URL}/chat/message`, { message }, {
    headers: { Authorization: `Bearer ${token}` }
  });