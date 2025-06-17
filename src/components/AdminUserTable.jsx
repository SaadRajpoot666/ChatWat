// src/components/AdminUserTable.jsx
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import api from "../axios";

export const AdminUserTable = ({table}) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No auth token found. Please login again.");
        return;
      }

      const res = await api.get("/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users 😓");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center text-green-800 mt-10">Loading users...</p>;

  return (
    <div className="p-4 md:p-8 hidden lg:block " id={table} >
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center md:text-left">
        👥 All Registered Users
      </h2>

      {/* Make it responsive & scrollable on small screens */}
      <div className="overflow-x-auto w-full bg-white rounded-lg shadow-md">
        <table className="min-w-[600px] w-full text-left">
          <thead className="bg-green-900 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b border-gray-200 hover:bg-green-50 transition-all"
              >
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">
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
    </div>
  );
};
