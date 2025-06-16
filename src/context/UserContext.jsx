// ✅ src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // We're just storing token for now
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, selectedChat, setSelectedChat }}>
      {children}
    </UserContext.Provider>
  );
};
