import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../axios";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please fill in all fields!");
    } else if (!email.includes("@")) {
      return toast.error("Enter a valid email!");
    }

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome back, ${user.name}!`);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/contacts");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="min-h-screen flex justify-center items-center bg-white">
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="flex flex-col border-2 border-green-800 px-20 py-10 shadow-xl rounded-lg">
            <h1 className="text-4xl text-green-900 font-extrabold text-center mb-6">
              Login to ChatWat
            </h1>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email:"
              value={formData.email}
              onChange={handleChange}
              className="bg-white shadow-md w-[30vw] py-2 px-4 mb-5 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
            />

            {/* Password */}
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password:"
                value={formData.password}
                onChange={handleChange}
                className="bg-white shadow-md w-[30vw] py-2 px-4 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
              />
              <span
                onClick={togglePassword}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 transition text-white font-bold py-2 rounded"
            >
              Login
            </button>

            {/* Optional: Link to Signup */}
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
