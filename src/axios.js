// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // or your backend URL
  withCredentials: true, // so cookies/JWTs work
});

export default instance;
