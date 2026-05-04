import { FaUserCircle } from "react-icons/fa";

function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <h2>Society Management</h2>

      <div className="nav-right">
        <FaUserCircle size={20} />
        <span>{user?.name} ({user?.role})</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;