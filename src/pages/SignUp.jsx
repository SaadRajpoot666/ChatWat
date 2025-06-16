import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../axios";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

export const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setChecked(checked);
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    if (!email.endsWith("@gmail.com")) {
      return toast.error("Only Gmail addresses are allowed");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!checked) {
      return toast.error("You must agree to our terms and conditions");
    }

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser({ ...res.data.user, token: res.data.token });

      toast.success("You Are Registered 🎉 Check your Gmail for OTP");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setChecked(false);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <title>Signup | ChatWat</title>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="min-h-screen flex justify-center items-center bg-white px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <div className="flex flex-col border-2 border-green-800 px-6 sm:px-12 py-10 shadow-xl rounded-lg">
            <h1 className="text-3xl sm:text-4xl text-green-900 font-extrabold text-center mb-6">
              Sign Up
            </h1>

            <input
              type="text"
              name="name"
              placeholder="Your Name:"
              value={formData.name}
              onChange={handleChange}
              className="bg-white shadow-md w-full py-2 px-4 mb-5 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
            />

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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative mb-5">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password:"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white shadow-md w-full py-2 px-4 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label className="text-sm text-gray-600 mt-2 mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              I agree with the{" "}
              <NavLink to="/terms" className="font-bold hover:underline">
                terms & conditions
              </NavLink>
            </label>

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 transition text-white font-bold py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
