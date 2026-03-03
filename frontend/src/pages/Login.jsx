import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import images from "../assets/assets";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSuccess = (token) => {
    Cookies.set("accessToken", token, { expires: 7 });
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        }
      );

      const data = await response.json();

      if (response.ok) {
        handleLoginSuccess(data.token);   
      } else {
        setErrorMessage(data.message);  
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const token = Cookies.get("accessToken");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-6 relative"
      style={{ backgroundImage: `url(${images.background_image})` }}
    >
      <Link to="/">
        <img
          src={images.logo}
          alt="logo"
          className="absolute top-6 left-6 w-24 sm:w-28"
        />
      </Link>

      <div className="w-full max-w-md bg-black/60 backdrop-blur-sm p-6 sm:p-8 rounded shadow-xl">
        <h2 className="text-white text-xl sm:text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <p className="text-center text-red-500 mt-4">
            {errorMessage}
          </p>
        )}

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;