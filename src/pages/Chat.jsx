import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import api from "../axios";
import { UserContext } from "../context/UserContext";

export const Chat = () => {
  const { id } = useParams(); // selected user ID
  const { user: currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const roomId = [currentUser._id, id].sort().join("_");

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("showTyping", () => setIsTyping(true));
    socket.on("hideTyping", () => setIsTyping(false));

    return () => {
      socket.off("receiveMessage");
      socket.off("showTyping");
      socket.off("hideTyping");
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${currentUser._id}/${id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    if (currentUser && id) fetchMessages();
  }, [currentUser, id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTyping = (e) => {
    setNewMsg(e.target.value);
    if (e.target.value) {
      socket.emit("typing", roomId);
    } else {
      socket.emit("stopTyping", roomId);
    }
  };

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      sender: currentUser._id,
      receiver: id,
      message: newMsg,
    });

    socket.emit("stopTyping", roomId);
    setNewMsg("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">ChatWat</h2>

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

        {isTyping && (
          <div className="text-sm text-gray-500 italic">Typing...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={newMsg}
          onChange={handleTyping}
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
