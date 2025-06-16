import { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export const Contacts = () => {
  const { user, setSelectedChat } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please login again.");
          return;
        }

        const res = await axios.get("/chat/users");

        console.log("Fetched Users:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load contacts.");
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (selectedUser) => {
    setSelectedChat(selectedUser);
    toast.success(`Chatting with ${selectedUser.name}`);
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading user info...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-900">Contacts</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No contacts found 💨</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u._id}
              className="p-3 bg-green-100 rounded hover:bg-green-200 cursor-pointer"
              onClick={() => handleUserClick(u)}
            >
              <span className="font-semibold">{u.name}</span> ({u.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
