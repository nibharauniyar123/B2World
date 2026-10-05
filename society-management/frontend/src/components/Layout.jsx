

// import Sidebar from "./Sidebar";
// // import { useState } from "react";
// import { useState, useEffect } from "react";
// import { FaBell } from "react-icons/fa";

// // function Layout({ children }) {
// //   const [collapsed, setCollapsed] = useState(false);
// function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   return (
//     <div style={{ display: "flex" }}>
      
//       {/* Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Main */}
//       <div
//         style={{
//           marginLeft: collapsed ? "80px" : "220px",
//           width: collapsed
//             ? "calc(100% - 80px)"
//             : "calc(100% - 220px)",
//           transition: "0.3s",
//         }}
//       >
//         {/* Topbar */}
//         {/* <div style={styles.topbar}>
//           <h3>Society Management</h3>
//         </div> */}
//         <div style={styles.topbar}>
//   <h3>Society Management</h3>

//   <div style={styles.notificationIcon}>
//     <FaBell size={20} />
//   </div>
// </div>

//         <div style={styles.content}>{children}</div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   topbar: {
//     height: "60px",
//     background: "#fff",
//     display: "flex",
//     alignItems: "center",
//     padding: "0 30px",
//     borderBottom: "1px solid #e5e7eb",
//   },
//   content: {
//     padding: "30px",
//     background: "#f8fafc",
//     minHeight: "100vh",
//   },
//   notificationIcon: {
//   marginLeft: "auto",
//   cursor: "pointer",
//   fontSize: "20px",
// },
// };

// export default Layout;
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/notifications/unread-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch unread count");
        }

        const data = await response.json();
        console.log("🔔 UNREAD NOTIFICATION COUNT:", data.count);
        setUnreadCount(data.count);
      } catch (error) {
        console.error("UNREAD NOTIFICATION ERROR:", error);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main */}
      <div
        style={{
          marginLeft: collapsed ? "80px" : "220px",
          width: collapsed
            ? "calc(100% - 80px)"
            : "calc(100% - 220px)",
          transition: "0.3s",
        }}
      >

        {/* Topbar */}
        <div style={styles.topbar}>
          <h3>Society Management</h3>

          {/* Notification Bell */}
          <div style={styles.notificationIcon}>
            <FaBell size={20} />

            {unreadCount > 0 && (
              <span style={styles.notificationBadge}>
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div style={styles.content}>
          {children}
        </div>

      </div>
    </div>
  );
}

const styles = {
  topbar: {
    height: "60px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "0 30px",
    borderBottom: "1px solid #e5e7eb",
  },

  notificationIcon: {
    marginLeft: "auto",
    cursor: "pointer",
    fontSize: "20px",
    position: "relative",
  },

  notificationBadge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    background: "red",
    color: "white",
    fontSize: "11px",
    fontWeight: "bold",
    minWidth: "18px",
    height: "18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
};

export default Layout;