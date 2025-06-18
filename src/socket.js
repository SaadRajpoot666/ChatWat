import { io } from "socket.io-client";

// Replace with your actual logic to get logged-in user ID
const userId = JSON.parse(localStorage.getItem("user"))?._id;

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket"],
  query: {
    userId: userId || "guest", // fallback if not logged in
  },
});

export default socket;
