import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import api from "../axios";
import {useNavigate} from "react-router-dom"
export const Contacts = () => {
  const navigate = useNavigate()
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

        const res = await api.get("/chat/users");
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
      navigate(`/chat/${selectedUser._id}`);

    toast.success(`Chatting with ${selectedUser.name} 💬`);
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading user info...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto mt-20 bg-white shadow-2xl  hover:scale-110 transition-all duration-200 ease-in-out rounded-2xl border border-green-900">
      <title>Contacts | ChatWat </title>
      <h2 className="text-3xl font-extrabold mb-6 text-green-900 text-center">
        Your Contacts 📇
      </h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-400 italic">No contacts found 💨</p>
      ) : (
        <ul className="space-y-3">
          {users.map((u) => (
            <li
              key={u._id}
              onClick={() => handleUserClick(u)}
              className="bg-white shadow-2xl hover:bg-green-200 transition hover:scale-110 duration-200 cursor-pointer rounded-xl px-5 py-3 flex items-center justify-between  hover:shadow-md"
            >
              <span className="bg-green-900 px-4 py-2 rounded-4xl text-white ">{u.name.charAt(0)}</span>
              <span className="text-lg font-semibold text-green-900">
                {u.name}
              </span>
              <span className="text-sm text-green-700">🟢 Online</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
