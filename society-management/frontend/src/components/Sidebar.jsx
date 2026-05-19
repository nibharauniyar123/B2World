import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaHome,
  FaUserFriends,
  FaExclamationCircle,
  FaTools,
  FaCalendarCheck,
  FaBars,
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
    { name: "Societies", icon: <FaBuilding />, path: "/societies" },
    { name: "Flats", icon: <FaHome />, path: "/flats" },
    { name: "Visitors", icon: <FaUserFriends />, path: "/visitors" },
    { name: "Complaints", icon: <FaExclamationCircle />, path: "/complaints" },
    { name: "Maintenance", icon: <FaTools />, path: "/maintenance" },
    { name: "Bookings", icon: <FaCalendarCheck />, path: "/bookings" },
    { name: "Upload", icon: <FaUpload />, path: "/upload" },
    { name: "Notifications", icon: <FaMoneyBill />, path: "/notifications" },
    { name: "Payments", icon: <FaMoneyBill />, path: "/payments" }   , 
 { name: "Invoices", icon: <FaMoneyBill />, path: "/invoices" },
  ];

  return (
    <div
      style={{
        ...styles.sidebar,
        width: collapsed ? "80px" : "220px",
      }}
    >
      {/* Toggle */}
      <div
        style={styles.toggle}
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </div>

      <h2 style={styles.logo}>
        {collapsed ? "S" : "Society"}
      </h2>

      {menu.map((item) => (
        <div
          key={item.name}
          style={styles.menuItem}
          onClick={() => navigate(item.path)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#1e293b")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span>{item.icon}</span>
          {!collapsed && <span>{item.name}</span>}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    height: "100vh",
    background: "#0f172a",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    padding: "20px 10px",
    transition: "0.3s",
  },

  logo: {
    textAlign: "center",
    marginBottom: "20px",
  },

  toggle: {
    cursor: "pointer",
    marginBottom: "20px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "0.2s",
  },
};

export default Sidebar;