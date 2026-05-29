// // import { useEffect, useState } from "react";
// // import axios from "../utils/axios";
// // import Layout from "../components/Layout";

// // function Reports() {
// //   const [reports, setReports] = useState({});

// //   const fetchReports = async () => {
// //     try {
// //       const res = await axios.get("/reports");
// //       setReports(res.data);

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchReports();
// //   }, []);

// //   return (
// //     <Layout>
// //       <div style={styles.container}>
// //         <h1>Reports Dashboard</h1>

// //         <div style={styles.grid}>
// //           <div style={styles.card}>
// //             <h3>Total Users</h3>
// //             <h2>{reports.users}</h2>
// //           </div>

// //           <div style={styles.card}>
// //             <h3>Total Complaints</h3>
// //             <h2>{reports.complaints}</h2>
// //           </div>

// //           <div style={styles.card}>
// //             <h3>Total Bookings</h3>
// //             <h2>{reports.bookings}</h2>
// //           </div>

// //           <div style={styles.card}>
// //             <h3>Total Maintenance</h3>
// //             <h2>{reports.maintenance}</h2>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // }

// // export default Reports;

// const styles = {
//   container: {
//     padding: "20px",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(220px,1fr))",
//     gap: "20px",
//     marginTop: "20px",
//   },

//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow:
//       "0 4px 10px rgba(0,0,0,0.05)",
//   },
// };

import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Layout from "../components/Layout";

function Reports() {

  const [stats, setStats] =
    useState({
      totalExpenses: 0,
      totalVendors: 0,
      totalComplaints: 0,
      totalVisitors: 0,
    });

  // =========================
  // FETCH REPORTS
  // =========================

  const fetchReports =
    async () => {

      try {

        const [
          expensesRes,
          vendorsRes,
          complaintsRes,
          visitorsRes,
        ] = await Promise.all([
          axios.get("/expenses"),
          axios.get("/vendors"),
          axios.get("/complaints"),
          axios.get("/visitors"),
        ]);

        const totalExpenseAmount =
          expensesRes.data.reduce(
            (sum, item) =>
              sum + item.amount,
            0
          );

        setStats({

          totalExpenses:
            totalExpenseAmount,

          totalVendors:
            vendorsRes.data.length,

          totalComplaints:
            complaintsRes.data.length,

          totalVisitors:
            visitorsRes.data.length,
        });

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchReports();

  }, []);

  return (

    <Layout>

      <div style={styles.container}>

        {/* TITLE */}

        <h1 style={styles.heading}>
          Reports Dashboard
        </h1>

        {/* GRID */}

        <div style={styles.grid}>

          {/* EXPENSES */}

          <div style={styles.card}>

            <h3 style={styles.title}>
              Total Expenses
            </h3>

            <h2 style={styles.value}>
              Rs. {stats.totalExpenses}
            </h2>

          </div>

          {/* VENDORS */}

          <div style={styles.card}>

            <h3 style={styles.title}>
              Total Vendors
            </h3>

            <h2 style={styles.value}>
              {stats.totalVendors}
            </h2>

          </div>

          {/* COMPLAINTS */}

          <div style={styles.card}>

            <h3 style={styles.title}>
              Total Complaints
            </h3>

            <h2 style={styles.value}>
              {stats.totalComplaints}
            </h2>

          </div>

          {/* VISITORS */}

          <div style={styles.card}>

            <h3 style={styles.title}>
              Total Visitors
            </h3>

            <h2 style={styles.value}>
              {stats.totalVisitors}
            </h2>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Reports;

// =========================
// STYLES
// =========================

const styles = {

  container: {
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "25px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",

    gap: "20px",

    marginTop: "20px",
  },

  card: {
    background: "#fff",

    padding: "25px",

    borderRadius: "16px",

    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",

    transition: "0.3s",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "15px",
  },

  value: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#2563eb",
  },
};