// src/pages/Dashboard.jsx
import { useEffect, useState, useContext } from "react";
import api from "../axios"; // Axios instance
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export const Dashboard = ({dashId}) => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMessages: 0,
    onlineUsers: 0,
    adminsCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, messagesRes, onlineRes, adminsRes] = await Promise.all([
          api.get("/admin/total-users", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          api.get("/admin/total-messages", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          api.get("/admin/online-users", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          api.get("/admin/admins-count", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        setStats({
          totalUsers: usersRes.data.count,
          totalMessages: messagesRes.data.count,
          onlineUsers: onlineRes.data.count,
          adminsCount: adminsRes.data.count,
        });
      } catch (err) {
        toast.error("Failed to fetch dashboard stats 😓");
        console.error(err);
      }
    };

    fetchStats();
  }, [user.token]);

  return (
    <div className="p-6" id={dashId} >
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center uppercase">
        🛡️ Welcome to Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.totalUsers} color="bg-blue-100" />
        <Card title="Total Messages" value={stats.totalMessages} color="bg-yellow-100" />
        <Card title="Online Users" value={stats.onlineUsers} color="bg-green-100" />
        <Card title="Admins Count" value={stats.adminsCount} color="bg-red-100" />
      </div>

      <div className="mt-12 text-center text-gray-600 italic">
        📊 Analytics, logs, and charts coming soon...
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => {
  return (
    <div className={`rounded-2xl shadow-md p-6 text-center ${color}`}>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-green-800 mt-2">{value}</p>
    </div>
  );
};

