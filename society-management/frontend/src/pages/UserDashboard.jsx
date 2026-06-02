// import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";

// function UserDashboard() {
//   const navigate = useNavigate();

//   return (
//     <Layout>
//       <div style={styles.page}>
//         <h1 style={styles.title}>User Dashboard 👤</h1>
//         <p style={styles.sub}>Your activities</p>

//         <div style={styles.grid}>
//           <div style={styles.card} onClick={() => navigate("/complaints")}>
//             <h3>📝 My Complaints</h3>
//             <p>Track your complaints</p>
//           </div>

//           <div style={styles.card} onClick={() => navigate("/bookings")}>
//             <h3>📅 My Bookings</h3>
//             <p>View your bookings</p>
//           </div>

//           <div style={styles.card} onClick={() => navigate("/visitors")}>
//             <h3>🚶 Visitors</h3>
//             <p>Manage visitors</p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default UserDashboard;

// const styles = {
//   page: { padding: "30px" },

//   title: { fontSize: "30px", fontWeight: "700" },

//   sub: { color: "#6b7280", marginBottom: "20px" },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "15px",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//     cursor: "pointer",
//   },
// };

function UserDashboard() {
 return (
  <div>
   <h1>Resident Dashboard</h1>

   <div>My Complaints</div>
   <div>My Maintenance</div>
   <div>My Payments</div>
   <div>My Bookings</div>
  </div>
 );
}

export default UserDashboard;