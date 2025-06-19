import { useState, useContext } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Verify = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || !email) {
      return toast.error("Please enter both email and OTP.");
    }

    setLoading(true);

    try {
      const res = await axios.post("/auth/verify-otp", {
        otp,
        email,
      });

      localStorage.setItem("token", res.data.token); // ✅ Save token
      setUser({ ...res.data.user, token: res.data.token }); // ✅ Set user
      toast.success("OTP Verified ✅");

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Verification error:", err);
      toast.error(err.response?.data?.message || "Verification failed 😢");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center mt-[15%] bg-white rounded-lg shadow-md">
      <title>Verify OTP | ChatWat</title>
      <h2 className="text-2xl font-bold mb-4 text-green-900">Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border px-4 py-2 w-full mb-4 rounded"
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 w-full mb-4 rounded"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`${
          loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-900 hover:bg-green-800"
        } text-white px-6 py-2 rounded transition-all duration-300`}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
      <p className="mt-[5%] text-red-600 ">Check: OTP & Email is Correct</p>
    </div>
  );
};
