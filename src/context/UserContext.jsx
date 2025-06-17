// ✅ src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData)); // Now it sets full user info
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, selectedChat, setSelectedChat }}>
      {children}
    </UserContext.Provider>
  );
};
