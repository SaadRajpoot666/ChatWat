import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [token, setToken] = useState(null); 
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token"); //  Get token from localStorage

    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token, // Provide token here
        setToken,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
