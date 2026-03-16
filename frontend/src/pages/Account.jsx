import API_BASE_URL from "../config/config";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const token = Cookies.get("accessToken");

  const onLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  useEffect(() => {

    const handleProfile = async () => {

      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUserData(data.user);
      } else {
        console.log("Error fetching profile:", data.error);
      }

    };

    handleProfile();

  }, [token]);

  return (

    <div className="min-h-screen bg-[#f3f4f6]">

      <Navbar />

      <div className="max-w-4xl mx-auto pt-28 px-4 sm:px-8">

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          Account
        </h1>

        <hr className="border-gray-300 mb-8" />

        
        <div className="flex flex-col md:flex-row md:items-center md:gap-20 mb-6">

          <p className="text-gray-400 font-medium md:min-w-40">
            Username
          </p>

          <p className="text-gray-900 mt-1 md:mt-0">
            {userData?.username || "No username found"}
          </p>

        </div>

        <hr className="border-gray-300 mb-8" />

       
        <div className="flex flex-col md:flex-row md:items-center md:gap-20 mb-6">

          <p className="text-gray-400 font-medium md:min-w-40">
            Email
          </p>

          <p className="text-gray-900 mt-1 md:mt-0">
            {userData?.email || "No email found"}
          </p>

        </div>

        <hr className="border-gray-300 my-10" />

        <div className="flex justify-center">

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
};

export default Account;