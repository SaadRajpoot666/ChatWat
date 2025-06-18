import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import api from "../axios";
import { UserSettings } from "../components/UserSettings";

export const AdminSettings = ({settingsId}) => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(UserContext)

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="p-6" id={settingsId} >
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🛠️ User Management</h2>
      <UserSettings users={users} refresh={fetchUsers} />
    </div>
  );
};

