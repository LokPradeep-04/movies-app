import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 px-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Account
        </h1>
        <hr className="border-gray-300 mb-8" />
        <div className="flex gap-20 mb-6">
          <p className="text-gray-400 font-medium min-w-40">
            Member ship
          </p>
          <p className="text-gray-900">
            rahul@gmail.com
          </p>
        </div>

        <hr className="border-gray-300 my-10" />

        <div className="flex justify-center mt-10">
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