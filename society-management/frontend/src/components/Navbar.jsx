
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // remove token
    localStorage.removeItem("token");

    // redirect to login
    navigate("/");

  };

  return (

    <div className="flex justify-between items-center bg-white shadow p-4">

      {/* Title */}

      <h1 className="text-xl font-bold text-gray-700">
        Society Admin Dashboard
      </h1>

      {/* Logout Button */}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>

  );

}