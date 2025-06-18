import React, { useContext, useEffect, useState } from "react";
import { AdminMessageTable } from "../components/AdminMessageTable";
import api from "../axios";
import { UserContext } from "../context/UserContext";

export const AdminMessages = ({messageId}) => {
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
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [token]);

  // Function to delete a message
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this message?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/admin/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="p-4  " id={messageId} >
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        📨 Admin Messages
      </h2>
      <AdminMessageTable messages={messages} onDelete={handleDelete} />
    </div>
  );
};

