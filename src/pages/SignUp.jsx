import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


export const SignUp = () => {
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

  const handleSubmit = (e) => {
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

    toast.success("You Are Registered 🎉");

    setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 2000);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setChecked(false);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored"   />
      <div className="min-h-screen flex justify-center items-center bg-white">
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="flex flex-col border-2 border-green-800 px-20 py-10 shadow-xl rounded-lg">
            <h1 className="text-4xl text-green-900 font-extrabold text-center mb-6">
              Sign Up
            </h1>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name:"
              value={formData.name}
              onChange={handleChange}
              className="bg-white shadow-md w-[30vw] py-2 px-4 mb-5 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
            />

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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-5">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password:"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white shadow-md w-[30vw] py-2 px-4 rounded-lg placeholder-gray-700 border-0 border-b-2 border-transparent focus:border-green-500 hover:border-green-400 outline-none transition-all duration-300 ease-in-out"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Checkbox */}
            <label className="text-sm text-gray-600 mt-2 mb-4">
              <input
                type="checkbox"
                name="checkbox"
                checked={checked}
                onChange={handleChange}
                className="mr-2"
              />
              I agree with the <NavLink to={"/terms"} className={"font-bold hover:underline "}>
                 terms & conditions
                </NavLink>
            </label>

            {/* Submit */}
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
