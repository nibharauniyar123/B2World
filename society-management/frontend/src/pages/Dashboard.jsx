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
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [recentVisitors, setRecentVisitors] =
  useState([]);
  const [stats, setStats] = useState({
    users: 0,
    societies: 0,
    complaints: 0,
    visitors: 0,
    maintenance: 0,
    revenue: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);

  // ========================
  // FETCH DATA 
  // ========================
//   const fetchStats = async () => {
//     try {
//       const [
//         usersRes,
//         societyRes,
//         complaintRes,
//         visitorRes,
//         maintenanceRes,
//         bookingRes,
//         // revenueRes,
//       ] = await Promise.all([
//         axios.get("/api/users"),
//         axios.get("/api/societies"),
//         axios.get("/api/complaints"),
//         axios.get("/api/visitors"),
//         axios.get("/api/maintenance"),
//         axios.get("/api/bookings"),
//         // axios.get("/api/revenue"),
//       ]);
// //       const res = await axios.get("/api/dashboard");

// // console.log("Dashboard API:", res.data);

// // // setStats(res.data);

//    setStats({
//    users: usersRes.data?.users?.length || usersRes.data.length || 0,
//      societies: societyRes.data.length || 0,
//      complaints: complaintRes.data.length || 0,
//   visitors: visitorRes.data.length || 0,
//   maintenance: maintenanceRes.data.length || 0,
//       revenue: revenueRes.data.revenue || 0,  
//       bookings: bookingRes.data.length || 0,
//      });
//      } catch (error) {
//       console.log("Dashboard Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

const fetchStats = async () => {
  try {
    const res = await axios.get("/api/dashboard");

    console.log("Dashboard Data =", res.data);

    setStats(res.data);

    setRecentComplaints(
      res.data.recentComplaints || []
    );

    setRecentVisitors(
      res.data.recentVisitors || []
    );

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchStats();
}, []);
const isAdmin = user?.role === "ADMIN";
const isResident = user?.role === "RESIDENT";
const isSecurity = user?.role === "SECURITY";
const isAccountant = user?.role === "ACCOUNTANT";
  // const cards = [
    // { title: "Total Users", value: stats.users, color: "#2563eb" },
    // { title: "Societies", value: stats.societies, color: "#16a34a" },
    // { title: "Complaints", value: stats.complaints, color: "#ef4444" },
//     { title: "Visitors", value: stats.visitors, color: "#f59e0b" },
//     { title: "Maintenance", value: stats.maintenance, color: "#8b5cf6" },
//     { title: "Bookings", value: stats.bookings, color: "#06b6d4" },
//     // { title: "Revenue", value: stats.revenue, color: "#10b981" },
//     {
//  title: "Revenue",
//  value: `Rs. ${stats.revenue}`,
//  color: "#10b981"
// },
//   ];
let cards = [];

// if (isAdmin) {
//   cards = [
//     { title: "Total Users", value: stats.users, color: "#2563eb" },
//     { title: "Complaints", value: stats.complaints, color: "#ef4444" },
//     { title: "Revenue", value: stats.revenue, color: "#10b981" },
//     { title: "Occupancy", value: "80%", color: "#f59e0b" },
//   ];
// }
if (isAdmin) {
 cards = [
   {
     title: "Total Users",
     value: stats.users,
     color: "#2563eb",
   },
   {
     title: "Complaints",
     value: stats.complaints,
     color: "#ef4444",
   },
   {
     title: "Revenue",
     value: `Rs. ${stats.revenue}`,
     color: "#10b981",
   },
   {
     title: "Occupancy",
     value: "80%",
     color: "#f59e0b",
   },
 ];
}

// if (isResident) {
//   cards = [
//     { title: "My Complaints", value: stats.complaints, color: "#ef4444" },
//     { title: "My Bookings", value: stats.bookings, color: "#06b6d4" },
//     { title: "My Notices", value: 5, color: "#8b5cf6" },
//     { title: "My Due Amount", value: "Rs. 0", color: "#f59e0b" },
//   ];
// }
if (isResident) {
 cards = [
   {
     title: "My Complaints",
     value: stats.complaints,
     color: "#ef4444",
   },
   {
     title: "My Bookings",
     value: stats.bookings,
     color: "#06b6d4",
   },
   {
     title: "My Notices",
     value: 5,
     color: "#8b5cf6",
   },
   {
     title: "My Due Amount",
     value: "Rs. 0",
     color: "#f59e0b",
   },
 ];
}
// if (isSecurity) {
//   cards = [
//     { title: "Visitors Today", value: stats.visitors, color: "#06b6d4" },
//     { title: "Approved Visitors", value: 5, color: "#16a34a" },
//     { title: "Pending Visitors", value: 2, color: "#ef4444" },
//   ];
// }
if (isSecurity) {
 cards = [
   {
     title: "Visitors Today",
     value: stats.visitors,
     color: "#06b6d4",
   },
   {
     title: "Approved Visitors",
     value: 5,
     color: "#16a34a",
   },
   {
     title: "Pending Visitors",
     value: 2,
     color: "#ef4444",
   },
 ];
}

// if (isAccountant) {
//   cards = [
//     { title: "Collection", value: stats.revenue, color: "#10b981" },
//     { title: "Pending Payments", value: 3, color: "#ef4444" },
//     { title: "Expenses", value: "Rs. 5000", color: "#f59e0b" },
//     { title: "Revenue", value: stats.revenue, color: "#2563eb" },
//   ];
// }
if (isAccountant) {
 cards = [
   {
     title: "Collection",
     value: `Rs. ${stats.revenue}`,
     color: "#10b981",
   },
   {
     title: "Pending Payments",
     value: 3,
     color: "#ef4444",
   },
   {
     title: "Expenses",
     value: "Rs. 5000",
     color: "#f59e0b",
   },
   {
     title: "Revenue",
     value: `Rs. ${stats.revenue}`,
     color: "#2563eb",
   },
 ];
}

  return (
    <Layout>
      <div style={styles.page}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.sub}>Society Management Overview</p>
            <h3>User Role: {user?.role}</h3>
          
          </div>
<div style={styles.topActions}>
  {user?.role === "ADMIN" && (
    <button
      style={styles.adminBtn}
      onClick={() => navigate("/admin")}
    >
      Admin Panel
    </button>
  )}

  <button
    style={styles.userBtn}
    onClick={() => navigate("/user")}
  >
    User Panel
  </button>
</div>
 
</div>
{/* {isResident && (
  <div style={styles.box}>
    <h3>Resident Summary</h3>

    <p>My Complaints: {stats.complaints}</p>

    <p>My Bookings: {stats.bookings}</p>

    <p>My Notices: 5</p>

    <p>Due Amount: Rs. 0</p>
  </div>
)} */}
{/* {isAdmin && (
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "20px",
    }}
  >
    <h2>Admin Dashboard</h2>

    <p>Total Users: {stats.users}</p>

    <p>Total Complaints: {stats.complaints}</p>

    <p>Revenue: Rs. {stats.revenue}</p>

    <p>Occupancy: 80%</p>
    <>
   <QuickActions />
    <Summary />
    <Chart />
    <RecentComplaints />
    <RecentVisitors />
  </>
  </div>
)} */}


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
            <button
  onClick={() => navigate("/reports")}
>
  View Reports
</button>

          </div>
     
          <div style={styles.summaryBox}>
  <h3>Summary</h3>

<p>Total Users: {stats.users}</p>
<p>Total Complaints: {stats.complaints}</p>
<p>Visitors: {stats.visitors}</p>
<p>Bookings: {stats.bookings}</p>
<p>Revenue: Rs. {stats.revenue}</p>
 
  <div style={{ marginTop: "20px" }}>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        // data={[
        //   { name: "Users", value: 6 },
        //   { name: "Societies", value: 3 },
        //   { name: "Complaints", value: 4 },
        //   { name: "Bookings", value: 3 },
        // ]}
        data={[
 { name:"Users", value:stats.users },
 { name:"Societies", value:stats.societies },
 { name:"Complaints", value:stats.complaints },
 { name:"Bookings", value:stats.bookings },
]}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
<div style={styles.tableBox}>
  <h3>Recent Complaints</h3>

  <table width="100%">
    <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Society</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>
      {recentComplaints.map((item) => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.status}</td>
          <td>
            {item.society?.name}
          </td>
          <td>
            {new Date(
              item.createdAt
            ).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div style={styles.tableBox}>
  <h3>Recent Visitors</h3>

  <table width="100%">
    <thead>
      <tr>
        <th>Name</th>
        <th>Flat</th>
        <th>Entry Time</th>
      </tr>
    </thead>

    <tbody>
      {recentVisitors.map((v) => (
        <tr key={v.id}>
          <td>{v.name}</td>

          <td>{v.flatNumber}</td>

          <td>
            {new Date(
              v.createdAt
            ).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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

  quickBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "100%",
  },

  summaryBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "100%",
  },
  adminBtn: {
  background: "#0f172a",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "20px",
  cursor: "pointer",
},

userBtn: {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "20px",
  cursor: "pointer",
},
tableBox: {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
  overflowX: "auto",
},
};





