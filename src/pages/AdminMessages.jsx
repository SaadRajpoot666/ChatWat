import React, { useContext, useEffect, useState } from "react";
import { AdminMessageTable } from "../components/AdminMessageTable";
import api from "../axios";
import { UserContext } from "../context/UserContext";
import socket from "../socket"
export const AdminMessages = ({ messageId }) => {
  const [messages, setMessages] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/admin/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("🟢 Admin Messages Response:", res.data);
        setMessages(res.data.messages);
      } catch (error) {
        console.error("❌ Failed to fetch messages:", error.response?.data || error.message);
      }
    };

    fetchMessages();

    // 🧲 Listen for real-time delete updates
    socket.on("messageDeleted", (deletedId) => {
      console.log("🔴 Message deleted (socket):", deletedId);
      setMessages((prev) => prev.filter((msg) => msg._id !== deletedId));
    });

    return () => {
      socket.off("messageDeleted");
    };
  }, [token]);

  const handleDelete = async (id) => {

    try {
      await api.delete(`/admin/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🛰 Emit event to notify others
      socket.emit("messageDeleted", id);

      // 🧹 Optimistic UI update
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="p-4" id={messageId}>
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        📨 Admin Messages
      </h2>
      <AdminMessageTable messages={messages} onDelete={handleDelete} />
    </div>
  );
};
