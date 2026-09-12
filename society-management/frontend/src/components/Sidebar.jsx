
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaHome,
  FaUserFriends,
  FaExclamationCircle,
  FaTools,
  FaMoneyBill,
  FaCalendarCheck,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserCheck,
  FaUpload,
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
console.log(user?.role);

  const role = user?.role;

  // ================= ADMIN =================

const adminMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
  // { name: "Users", icon: <FaUsers />, path: "/users" },
  { name: "Societies", icon: <FaBuilding />, path: "/societies" },
  { name: "Flats", icon: <FaHome />, path: "/flats" },
  { name: "Visitors", icon: <FaUserFriends />, path: "/visitors" },
  { name: "Complaints", icon: <FaExclamationCircle />, path: "/complaints" },
  { name: "Maintenance", icon: <FaTools />, path: "/maintenance" },
  // { name: "Payments", icon: <FaMoneyBill />, path: "/payments" },
  // { name: "Invoices", icon: <FaMoneyBill />, path: "/invoices" },
  // { name: "Expenses", icon: <FaMoneyBill />, path: "/expenses" },
  { name: "Reports", icon: <FaMoneyBill />, path: "/reports" },
];

  // ================= RESIDENT =================

 const residentMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/resident" },
  { name: "My Complaints", icon: <FaExclamationCircle />, path: "/complaints" },
  { name: "My Bookings", icon: <FaCalendarCheck />, path: "/bookings" },
  { name: "Notices", icon: <FaBuilding />, path: "/notices" },
  {
  name: "My Complaints",
  path: "/my-complaints",
  icon: <FaExclamationCircle />,
},
];

  // ================= SECURITY =================

const guardMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/guard" },
  { name: "Today's Visitors", icon: <FaUserFriends />, path: "/visitors" },
  { name: "Approved Visitors", icon: <FaUserCheck />, path: "/approved-visitors" },
  { name: "Pending Visitors", icon: <FaExclamationCircle />, path: "/pending-visitors" },
];
  // ================= ACCOUNTANT =================

const accountantMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/accountant" },
  // { name: "Payments", icon: <FaMoneyBill />, path: "/payments" },
  // { name: "Invoices", icon: <FaMoneyBill />, path: "/invoices" },
  // { name: "Expenses", icon: <FaMoneyBill />, path: "/expenses" },
  {name: "Reports", icon: <FaMoneyBill />, path: "/reports" },
];
  // ================= SUPER ADMIN =================

const superAdminMenu = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/super-admin" },
  { name: "Societies", icon: <FaBuilding />, path: "/societies" },
];

  // ================= COMMON =================

 const commonMenu = [
  { name: "Profile", icon: <FaUser />, path: "/profile" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
  { name: "Logout", icon: <FaSignOutAlt />, path: "/" },
];

  // ================= ROLE MENU =================

  let menu = [];

  switch (role) {
    case "SUPER_ADMIN":
      menu = [...superAdminMenu, ...commonMenu];
      break;

    case "ADMIN":
      menu = [...adminMenu, ...commonMenu];
      break;

    case "GUARD":
      menu = [...guardMenu, ...commonMenu];
      break;

    case "ACCOUNTANT":
      menu = [...accountantMenu, ...commonMenu];
      break;

    case "RESIDENT":
      menu = [...residentMenu, ...commonMenu];
      break;

    default:
      menu = [...residentMenu, ...commonMenu];
  }
 

// let menu = [];

// if (role === "ADMIN") {
//   menu = [...adminMenu, ...commonMenu];
// } else if (role === "RESIDENT") {
//   menu = [...residentMenu, ...commonMenu];
// } else if (role === "GUARD") {
//   menu = [...guardMenu, ...commonMenu];
// } else if (role === "ACCOUNTANT") {
//   menu = [...accountantMenu, ...commonMenu];
// } else if (role === "SUPER_ADMIN") {
//   menu = [...superAdminMenu, ...commonMenu];
// }

  return (
    <div
      style={{
        ...styles.sidebar,
        width: collapsed ? "80px" : "230px",
      }}
    >
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
    overflowY: "auto",
  },

  toggle: {
    cursor: "pointer",
    fontSize: "22px",
    marginBottom: "25px",
  },

  logo: {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "700",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Sidebar;