import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Users", value: 6 },
  { name: "Societies", value: 3 },
  { name: "Complaints", value: 4 },
  { name: "Bookings", value: 3 },
];

function Dashboard() {
const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({
    users: 0,
    societies: 0,
    complaints: 0,
    visitors: 0,
    maintenance: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);

  // ========================
  // FETCH DATA
  // ========================
  const fetchStats = async () => {
    try {
      const [
        usersRes,
        societyRes,
        complaintRes,
        visitorRes,
        maintenanceRes,
        bookingRes,
      ] = await Promise.all([
        axios.get("/users"),
        axios.get("/societies"),
        axios.get("/complaints"),
        axios.get("/visitors"),
        axios.get("/maintenance"),
        axios.get("/bookings"),
      ]);

      setStats({
        users: usersRes.data?.users?.length || usersRes.data.length || 0,
        societies: societyRes.data.length || 0,
        complaints: complaintRes.data.length || 0,
        visitors: visitorRes.data.length || 0,
        maintenance: maintenanceRes.data.length || 0,
        bookings: bookingRes.data.length || 0,
      });
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Users", value: stats.users, color: "#2563eb" },
    { title: "Societies", value: stats.societies, color: "#16a34a" },
    { title: "Complaints", value: stats.complaints, color: "#ef4444" },
    { title: "Visitors", value: stats.visitors, color: "#f59e0b" },
    { title: "Maintenance", value: stats.maintenance, color: "#8b5cf6" },
    { title: "Bookings", value: stats.bookings, color: "#06b6d4" },
  ];

  return (
    <Layout>
      <div style={styles.page}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.sub}>Society Management Overview</p>
          
          </div>

<div style={styles.topActions}>
  {user?.role === "ADMIN" && (
    <div
      style={styles.badge}
      onClick={() => navigate("/admin")}
    >
      Admin Panel
    </div>
  )}

  <div
    style={styles.userBadge}
    onClick={() => navigate("/user")}
  >
    User Panel
  </div>
</div>
 
</div>

        {/* STATS */}
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.grid}>
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  ...styles.card,
                  borderTop: `5px solid ${card.color}`,
                }}
              >
                <h3 style={styles.cardTitle}>{card.title}</h3>

                <h2
                  style={{
                    ...styles.cardValue,
                    color: card.color,
                  }}
                >
                  {card.value}
                </h2>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM SECTION */}
        <div style={styles.bottomGrid}>
          {/* Quick Actions */}
          <div style={styles.box}>
            <h3 style={styles.boxTitle}>Quick Actions</h3>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/users")}
            >
              ➕ Add User
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/societies")}
            >
              ➕ Add Society
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/bookings")}
            >
              ➕ Add Booking
            </button>
          </div>

          {/* Summary */}
          <div style={styles.box}>
            <h3 style={styles.boxTitle}>Summary</h3>

            <p>Total Users: {stats.users}</p>
            <p>Pending Complaints: {stats.complaints}</p>
            <p>Visitors Today: {stats.visitors}</p>
            <p>Bookings: {stats.bookings}</p>
              <div style={styles.chart}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

// =======================
// STYLES
// =======================
const styles = {
  page: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },

  title: {
    fontSize: "40px",
    fontWeight: "700",
    margin: 0,
    color: "#111827",
  },

  sub: {
    color: "#6b7280",
    marginTop: "5px",
  },

  badge: {
    background: "#111827",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "30px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  loading: {
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  cardTitle: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "10px",
  },

  cardValue: {
    fontSize: "34px",
    fontWeight: "700",
    margin: 0,
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
  },

  box: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  boxTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  actionBtn: {
    display: "block",
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
  topActions: {
  display: "flex",
  gap: "10px",
},

userBadge: {
  background: "#16a34a",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "30px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
},
  topActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginBottom: "20px",
  },
  chart: {
  marginTop: "20px",
  width: "100%",
},
};