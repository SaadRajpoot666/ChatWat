import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../axios";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please fill in all fields!");
    } else if (!email.includes("@")) {
      return toast.error("Enter a valid email!");
    }

    setLoading(true);

    try {
      const res = await axios.post("/auth/login", formData);
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser({ ...user, token });
        toast.success("Logged in successfully 🌟");

        setTimeout(() => {
          setLoading(false);
          navigate("/contacts");
        }, 2000);
      } else {
        toast.error("Token missing from response ❌");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Login failed 😢");
      setLoading(false);
    }
  };

  return (
    <div>
      <title>Login | ChatWat</title>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="min-h-screen flex justify-center items-center bg-white px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <div className="flex flex-col border-2 border-green-800 px-6 sm:px-12 py-10 shadow-xl rounded-lg">
            <h1 className="text-3xl sm:text-4xl text-green-900 font-extrabold text-center mb-6">
              Login to ChatWat
            </h1>

            <input
              type="email"
              name="email"
              placeholder="Email:"
              value={formData.email}
              onChange={handleChange}
              className="bg-white shadow-md w-full py-2 px-4 mb-5 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
            />

            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password:"
                value={formData.password}
                onChange={handleChange}
                className="bg-white shadow-md w-full py-2 px-4 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
              />
              <span
                onClick={togglePassword}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              } transition text-white font-bold py-2 rounded`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="mt-4 text-sm text-center text-green-700">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-900 font-medium underline">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
