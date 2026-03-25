import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import API_BASE_URL from "../../config/config";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const profileResponse = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const profileData = await profileResponse.json();

   
        if (profileData.user.role === "admin") {
        
          Cookies.set("accessToken", data.token, { expires: 7 });
          toast.success("Welcome Admin! 🎉");
          navigate("/admin/dashboard");
        } else {
         
          setErrorMessage("Access denied. You are not an admin.");
        }

      } else {
        
        setErrorMessage(data.message);
      }

    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const token = Cookies.get("accessToken");
  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#181818] flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-[#242424] p-8 rounded-lg shadow-xl">

        <h2 className="text-white text-2xl font-semibold text-center mb-2">
          Admin Panel
        </h2>

        <p className="text-gray-400 text-sm text-center mb-8">
          Sign in with your admin credentials
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-[#181818] text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
          >
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;
