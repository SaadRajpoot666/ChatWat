// src/pages/Admin.jsx
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import api from "../axios";

export const Admin = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
  try {
    console.log("Fetching all users...");

    const res = await api.get("/users/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("Token:", localStorage.getItem("token"));
    console.log("Users fetched :", res.data);

    setUsers(res.data); // HERE'S THE FIX
    setLoading(false);
  } catch (err) {
    toast.error("Failed to fetch users 😓");
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Admin Dashboard</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-900 text-white">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b hover:bg-green-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                {u.role === "admin" ? (
                  <span className="text-green-600 font-semibold">Admin</span>
                ) : (
                  <span className="text-gray-600">User</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
