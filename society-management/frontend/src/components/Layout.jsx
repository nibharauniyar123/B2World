

import Sidebar from "./Sidebar";
import { useState } from "react";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

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
        </div>

        <div style={styles.content}>{children}</div>
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
  content: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
};

export default Layout;
