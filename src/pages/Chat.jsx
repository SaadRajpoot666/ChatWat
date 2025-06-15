import React, { useEffect, useState } from "react";
import socket from "../socket";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Chat = ({ currentUser }) => {
  const { selectedUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const roomId = [currentUser._id, selectedUserId].sort().join("_");

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(res.data);
    };

    fetchMessages();
  }, [selectedUserId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const msgData = {
      roomId,
      sender: currentUser._id,
      receiver: selectedUserId,
      message: newMsg,
    };

    socket.emit("sendMessage", msgData);
    setNewMsg("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">ChatWat 💬</h2>

      {/* Chat Messages */}
      <div className="bg-green-50 p-4 rounded-lg h-[400px] overflow-y-auto border border-green-200">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              msg.sender === currentUser._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 max-w-xs rounded-lg shadow text-sm ${
                msg.sender === currentUser._id
                  ? "bg-green-500 text-white"
                  : "bg-white border border-green-300 text-green-800"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

