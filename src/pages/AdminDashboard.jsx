// src/pages/Dashboard.jsx
import { useEffect, useState, useContext } from "react";
import api from "../axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export const Dashboard = ({ dashId }) => {
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
          api.get("/admin/dash/total-users", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          api.get("/admin/dash/total-messages", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          api.get("/admin/dash/online-users", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          api.get("/admin/dash/admins-count", {
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

  // 📊 Bar chart data
  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Messages", value: stats.totalMessages },
    { name: "Online", value: stats.onlineUsers },
    { name: "Admins", value: stats.adminsCount },
  ];

  return (
    <div className="p-6" id={dashId}>
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center uppercase">
        🛡️ Welcome to Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.totalUsers} color="bg-blue-100" />
        <Card title="Total Messages" value={stats.totalMessages} color="bg-yellow-100" />
        <Card title="Online Users" value={stats.onlineUsers} color="bg-green-100" />
        <Card title="Admins Count" value={stats.adminsCount} color="bg-red-100" />
      </div>

      {/* 🎯 Add the chart below */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          📊 Stats Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => {
  return (
    <div className={`rounded-2xl shadow-2xl p-6 text-center hover:scale-110 duration-200 transition-all ease-in-out hover:cursor-pointer ${color}`}>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-green-800 mt-2">{value}</p>
    </div>
  );
};
