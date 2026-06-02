import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={styles.page}>
        <h1 style={styles.title}>Admin Dashboard 👑</h1>
        <p style={styles.sub}>Manage complete system</p>

        <div style={styles.grid}>
          <div style={styles.card} onClick={() => navigate("/users")}>
            <h3>👤 Users</h3>
            <p>Manage all users</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/societies")}>
            <h3>🏢 Societies</h3>
            <p>Manage societies</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/complaints")}>
            <h3>⚠️ Complaints</h3>
            <p>View & resolve issues</p>
          </div>

          <div style={styles.card} onClick={() => navigate("/bookings")}>
            <h3>📅 Bookings</h3>
            <p>Track bookings</p>
          </div>
          <button
 onClick={() =>
  axios.post("/maintenance", {
   userId: 1,
   amount: 2500,
   month: "June 2026",
   dueDate: "2026-06-15",
  })
 }
>
 Generate Bill
</button>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;

const styles = {
  page: { padding: "30px" },

  title: { fontSize: "32px", fontWeight: "700" },

  sub: { color: "#6b7280", marginBottom: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
};