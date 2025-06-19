import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const NavBar = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (loading) return null;

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="md:text-2xl font-bold text-green-600">
        ChatWat
      </Link>

      <nav>
        <ul className="flex gap-6 items-center text-green-700 font-medium">
          {user ? (
            <>
              <li>
                <Link to="/contacts" className="hover:text-green-900">
                  Contacts
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link to="/admin" className="hover:text-green-900">
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-green-900">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-green-900">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
