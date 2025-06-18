import React, { useContext } from "react";
import api from "../axios";
import { UserContext } from "../context/UserContext";

export const UserSettings = ({ users, refresh }) => {
  const { token } = useContext(UserContext);

  const handleAction = async (id, action) => {
    try {
      await api.put(`/admin/users/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refresh();
    } catch (err) {
      alert("Action failed ❌");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this user?");
    if (!confirm) return;

    try {
      await api.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refresh();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No users found 😶‍🌫️
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">👥 Manage Users</h2>
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-green-100 uppercase text-xs tracking-wide">
          <tr>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b hover:bg-green-50 transition">
              <td className="p-3 font-medium">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">
                {user.isSuspended ? (
                  <span className="text-red-600 font-semibold">Suspended</span>
                ) : (
                  <span className="text-emerald-600 font-semibold">Active</span>
                )}
              </td>
              <td className="p-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAction(user._id, "toggle-role")}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition"
                >
                  Toggle Role
                </button>
                <button
                  onClick={() => handleAction(user._id, "toggle-suspend")}
                  className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white transition"
                >
                  {user.isSuspended ? "Unsuspend" : "Suspend"}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-500 hover:text-white transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
