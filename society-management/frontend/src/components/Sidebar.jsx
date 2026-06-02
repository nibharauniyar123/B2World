import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

import {
  FaTachometerAlt,
  FaUsers,
  FaUser,
  FaCog,
  FaBuilding,
  FaHome,
  FaUserFriends,
  FaExclamationCircle,
  FaTools,
  FaCalendarCheck,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
    const user = JSON.parse(
    localStorage.getItem("user")
  );
// const adminMenu = [
//   { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
//   { name: "Users", icon: <FaUsers />, path: "/users" },
//   { name: "Societies", icon: <FaBuilding />, path: "/societies" },
//   { name: "Flats", icon: <FaHome />, path: "/flats" },
//   { name: "Visitors", icon: <FaUserFriends />, path: "/visitors" },
//   { name: "Complaints", icon: <FaExclamationCircle />, path: "/complaints" },
//   { name: "Maintenance", icon: <FaTools />, path: "/maintenance" },
//   { name: "Payments", icon: <FaMoneyBill />, path: "/payments" },
//   { name: "Invoices", icon: <FaMoneyBill />, path: "/invoices" },
//   { name: "Expenses", icon: <FaMoneyBill />, path: "/expenses" },
//   { name: "Vendors", icon: <FaMoneyBill />, path: "/vendors" },
//   { name: "Reports", icon: <FaMoneyBill />, path: "/reports" },
// ];
const superAdminMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/super-admin" },
  { name: "Societies", icon: <FaBuilding />, path: "/societies" },
  { name: "Subscriptions", icon: <FaMoneyBill />, path: "/subscriptions" },
  { name: "Activity Logs", icon: <FaMoneyBill />, path: "/activity-logs" },
];

const guardMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/guard" },
  { name: "Visitors", icon: <FaUserFriends />, path: "/visitors" },
  { name: "QR Scan", icon: <FaUserFriends />, path: "/qr-scan" },
];

const accountantMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/accountant" },
  { name: "Payments", icon: <FaMoneyBill />, path: "/payments" },
  { name: "Expenses", icon: <FaMoneyBill />, path: "/expenses" },
  { name: "Invoices", icon: <FaMoneyBill />, path: "/invoices" },
];
const residentMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/user" },
  { name: "Complaints", icon: <FaExclamationCircle />, path: "/complaints" },
  { name: "Bookings", icon: <FaCalendarCheck />, path: "/bookings" },
  { name: "Maintenance", icon: <FaTools />, path: "/maintenance" },
  { name: "Payments", icon: <FaMoneyBill />, path: "/payments" },
];
const commonMenu = [
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },

  {
    name: "Logout",
    path: "/logout",
    icon: <FaSignOutAlt />,
  },
];
// if (user.role === "ADMIN") {
//   menu = [
//     ...adminMenu,
//     ...commonMenu
//   ];
// }

// if (user.role === "RESIDENT") {
//   menu = [
//     ...residentMenu,
//     ...commonMenu
//   ];
// }

// if (user.role === "GUARD") {
//   menu = [
//     ...guardMenu,
//     ...commonMenu
//   ];
// }

// if (user.role === "ACCOUNTANT") {
//   menu = [
//     ...accountantMenu,
//     ...commonMenu
//   ];
// }

// if (user.role === "SUPER_ADMIN") {
//   menu = [
//     ...superAdminMenu,
//     ...commonMenu
//   ];
// }
let menu = [];

if (user?.role === "SUPER_ADMIN") {
  menu = [...superAdminMenu, ...commonMenu];
}
else if (user?.role === "ADMIN") {
  menu = [...adminMenu, ...commonMenu];
}
else if (user?.role === "ACCOUNTANT") {
  menu = [...accountantMenu, ...commonMenu];
}
else if (user?.role === "GUARD") {
  menu = [...guardMenu, ...commonMenu];
}
else {
  menu = [...residentMenu, ...commonMenu];
}

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