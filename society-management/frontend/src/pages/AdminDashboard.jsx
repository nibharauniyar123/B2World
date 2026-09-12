
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const stats = {
    users: 5,
    complaints: 3,
    revenue: 2200,
    occupancy: 80,
    visitors: 1,
    bookings: 1,
  };

  // const complaints = [
  //   {
  //     title: "Lift Broken",
  //     status: "Pending",
  //     society: "ABC Society",
  //     date: "2026-06-21",
  //   },
  //   {
  //     title: "Water Issue",
  //     status: "Resolved",
  //     society: "Green Garden",
  //     date: "2026-06-20",
  //   },
  // ];
  const recentComplaints = [
  {
    id: 1,
    title: "Lift Broken",
    status: "Pending",
    society: "ABC Society",
    date: "2026-06-20",
  },
  {  id: 2,
    title: "Water Leakage",
    status: "Resolved",
    society: "Green Garden",
    date: "2026-06-18",
  },
];

  const recentVisitors = [
    {
       id: 1,
      name: "Nibha",
      flat: "A-101",
      time: "11:23 PM",
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "30px" }}>
        <h1>Admin Dashboard </h1>
        <p>Manage complete society system</p>

        {/* Statistics Cards */}
<div style={styles.cards}>
  <div style={{...styles.card,borderTop:"5px solid #3b82f6"}}>
    <h3>Total Users</h3>
    <h1>{stats.users}</h1>
  </div>

  <div style={{...styles.card,borderTop:"5px solid #ef4444"}}>
    <h3>Total Complaints</h3>
    <h1>{stats.complaints}</h1>
  </div>

  <div style={{...styles.card,borderTop:"5px solid #22c55e"}}>
    <h3>Revenue</h3>
    <h1>Rs. {stats.revenue}</h1>
  </div>

  <div style={{...styles.card,borderTop:"5px solid #f59e0b"}}>
    <h3>Occupancy</h3>
    <h1>{stats.occupancy}%</h1>
  </div>
</div>
 


   </div>    
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
 
</div>
</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>
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
   
  
    </Layout>
  );
}

export default AdminDashboard;

const styles = {
cards: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "20px",
  marginTop: "20px",
  marginBottom: "30px",
},
  card: {
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
},

  section: {
    background: "#fff",
    marginTop: "20px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },


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


  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "40px",
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
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
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
    gap: "30px",
    marginBottom: "20px",
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
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  overflowX: "auto",
},
tableGrid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginTop: "20px",
},

};