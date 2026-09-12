// import { useState, useEffect } from "react";
// import axios from "../utils/axios";

// import Layout from "../components/Layout";

// function GuardDashboard() {
//   const [visitors, setVisitors] = useState([]);

// const fetchVisitors = async () => {
//   try {
//     const res = await axios.get("/api/visitors");
//     setVisitors(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   fetchVisitors();
// }, []);
// // const today = new Date().toDateString();

// // const todayVisitors = visitors.filter(
// //   (v) =>
// //     new Date(v.createdAt).toDateString() === today
// // ).length;
// const isToday = (dateValue) => {
//   if (!dateValue) return false;

//   const visitorDate = new Date(dateValue);
//   const today = new Date();

//   return (
//     visitorDate.getFullYear() === today.getFullYear() &&
//     visitorDate.getMonth() === today.getMonth() &&
//     visitorDate.getDate() === today.getDate()
//   );
// };

// const todayVisitors = visitors.filter((visitor) =>
//   isToday(visitor.createdAt)
// ).length;

// const approvedVisitors = visitors.filter(
//   (v) => v.status === "APPROVED"
// ).length;

// const pendingVisitors = visitors.filter(
//   (v) => v.status === "PENDING"
// ).length;

// const checkedOutVisitors = visitors.filter(
//   (v) => v.checkOut !== null
// ).length;
//   const stats = {
//     visitorsToday: todayVisitors,
//     approvedVisitors: approvedVisitors,
//     pendingVisitors: pendingVisitors,
//     checkedOutVisitors: checkedOutVisitors,
//   };

//   return (
//     <Layout>
//       <div style={styles.page}>
//         <h1 style={styles.title}>Security Dashboard 🛡️</h1>
//         <p style={styles.sub}>
//           Visitor Management Overview
//         </p>

//         <div style={styles.cards}>
//           <div
//             style={{
//               ...styles.card,
//               borderTop: "5px solid #3b82f6",
//             }}
//           >
//             <h3>Visitors Today</h3>
//             <h1>{stats.visitorsToday}</h1>
//           </div>

//           <div
//             style={{
//               ...styles.card,
//               borderTop: "5px solid #22c55e",
//             }}
//           >
//             <h3>Approved Visitors</h3>
//             <h1>{stats.approvedVisitors}</h1>
//           </div>

//           <div
//             style={{
//               ...styles.card,
//               borderTop: "5px solid #ef4444",
//             }}
//           >
//             <h3>Pending Visitors</h3>
//             <h1>{stats.pendingVisitors}</h1>
//           </div>
//           <div style={{...styles.card, borderTop: "5px solid #f59e0b" }}>
//     <h3>Checked Out</h3>
//     <h2>{stats.checkedOutVisitors}</h2>
//   </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default GuardDashboard;

// const styles = {
//   page: {
//     padding: "30px",
//     background: "#f4f7fb",
//     minHeight: "100vh",
//   },

//   title: {
//     fontSize: "40px",
//     fontWeight: "700",
//     marginBottom: "10px",
//   },

//   sub: {
//     color: "#6b7280",
//     marginBottom: "30px",
//   },

//   cards: {
//   display: "grid",
//   gridTemplateColumns:
//     "repeat(auto-fit,minmax(220px,1fr))",
//   gap: "20px",
//   marginBottom: "30px",
// },

// card: {
//   background: "#fff",
//   padding: "20px",
//   borderRadius: "12px",
//   boxShadow:
//     "0 5px 15px rgba(0,0,0,.08)",
//   textAlign: "center",
// },
// };

import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Layout from "../components/Layout";

function GuardDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH ALL VISITORS
  // ==============================

  const fetchVisitors = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/visitors");

      console.log("Visitor API response:", response.data);

      // API ले direct array पठाएमा
      if (Array.isArray(response.data)) {
        setVisitors(response.data);
      }

      // API ले { visitors: [] } पठाएमा
      else if (Array.isArray(response.data.visitors)) {
        setVisitors(response.data.visitors);
      }

      else {
        setVisitors([]);
      }
    } catch (error) {
      console.error(
        "Visitor fetch error:",
        error.response?.data || error.message
      );
      console.log(
  "ALL VISITORS:",
  response.data
);

console.log(
  "CURRENT DATE:",
  new Date()
);

      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH WHEN PAGE OPENS
  // ==============================

  useEffect(() => {
    fetchVisitors();
  }, []);

  // ==============================
  // TODAY DATE CHECK
  // ==============================
// Convert date into local YYYY-MM-DD format
const getLocalDate = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Today's local date
const todayDate = getLocalDate(new Date());

// Count today's visitors
const todayVisitors = visitors.filter((visitor) => {
  const visitorDate = getLocalDate(
    visitor.createdAt
  );

  console.log(
    "Visitor:",
    visitor.name,
    "Visitor Date:",
    visitorDate,
    "Today:",
    todayDate
  );

  return visitorDate === todayDate;
}).length;

  const approvedVisitors = visitors.filter(
    (visitor) =>
      visitor.status?.toUpperCase() ===
      "APPROVED"
  ).length;

  const pendingVisitors = visitors.filter(
    (visitor) =>
      visitor.status?.toUpperCase() ===
      "PENDING"
  ).length;

  const checkedOutVisitors = visitors.filter(
    (visitor) =>
      visitor.status?.toUpperCase() ===
        "CHECKED_OUT" ||
      visitor.checkOut !== null &&
      visitor.checkOut !== undefined
  ).length;

  return (
    <Layout>
      <div style={styles.page}>

      {/* HEADER */}

      <div style={styles.header}>

        <h1 style={styles.title}>
          Security Dashboard 🛡️
        </h1>

        <p style={styles.subtitle}>
          Visitor Management Overview
        </p>

      </div>

      {/* LOADING */}

      {loading ? (

        <div style={styles.loading}>

          Loading visitor information...

        </div>

      ) : (

        <>

          {/* DASHBOARD CARDS */}

          <div style={styles.cardContainer}>

            {/* TODAY */}

            <div
              style={{
                ...styles.card,
                borderTop:
                  "6px solid #3b82f6",
              }}
            >

              <h3 style={styles.cardTitle}>
                Visitors Today
              </h3>

              <h2 style={styles.number}>
                {todayVisitors}
              </h2>

              <p style={styles.cardText}>
                Visitors registered today
              </p>

            </div>


            {/* APPROVED */}

            <div
              style={{
                ...styles.card,
                borderTop:
                  "6px solid #22c55e",
              }}
            >

              <h3 style={styles.cardTitle}>
                Approved Visitors
              </h3>

              <h2 style={styles.number}>
                {approvedVisitors}
              </h2>

              <p style={styles.cardText}>
                Approved visitor entries
              </p>

            </div>


            {/* PENDING */}

            <div
              style={{
                ...styles.card,
                borderTop:
                  "6px solid #ef4444",
              }}
            >

              <h3 style={styles.cardTitle}>
                Pending Visitors
              </h3>

              <h2 style={styles.number}>
                {pendingVisitors}
              </h2>

              <p style={styles.cardText}>
                Waiting for approval
              </p>

            </div>


            {/* CHECKED OUT */}

            <div
              style={{
                ...styles.card,
                borderTop:
                  "6px solid #f59e0b",
              }}
            >

              <h3 style={styles.cardTitle}>
                Checked Out
              </h3>

              <h2 style={styles.number}>
                {checkedOutVisitors}
              </h2>

              <p style={styles.cardText}>
                Visitors who have exited
              </p>

            </div>

          </div>


          {/* RECENT VISITORS */}

          <div style={styles.tableCard}>

            <div style={styles.tableHeader}>

              <div>

                <h2 style={styles.sectionTitle}>
                  Recent Visitors
                </h2>

                <p style={styles.sectionText}>
                  Latest visitor activity
                </p>

              </div>

              <button
                style={styles.refreshButton}
                onClick={fetchVisitors}
              >

                Refresh

              </button>

            </div>


            {visitors.length === 0 ? (

              <p style={styles.empty}>

                No visitor records found.

              </p>

            ) : (

              <div
                style={{
                  overflowX: "auto",
                }}
              >

                <table style={styles.table}>

                  <thead>

                    <tr>

                      <th style={styles.th}>
                        Visitor
                      </th>

                      <th style={styles.th}>
                        Phone
                      </th>

                      <th style={styles.th}>
                        Purpose
                      </th>

                      <th style={styles.th}>
                        Status
                      </th>

                      <th style={styles.th}>
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {visitors
                      .slice(0, 5)
                      .map((visitor) => (

                      <tr key={visitor.id}>

                        <td style={styles.td}>

                          {visitor.name ||
                            visitor.visitorName ||
                            "N/A"}

                        </td>

                        <td style={styles.td}>

                          {visitor.phone ||
                            "N/A"}

                        </td>

                        <td style={styles.td}>

                          {visitor.purpose ||
                            "N/A"}

                        </td>

                        <td style={styles.td}>

                          <span
                            style={{
                              ...styles.badge,

                              background:
                                visitor.status ===
                                "APPROVED"

                                  ? "#dcfce7"

                                  : visitor.status ===
                                    "PENDING"

                                  ? "#fef3c7"

                                  : "#e2e8f0",

                              color:
                                visitor.status ===
                                "APPROVED"

                                  ? "#15803d"

                                  : visitor.status ===
                                    "PENDING"

                                  ? "#b45309"

                                  : "#475569",
                            }}
                          >

                            {visitor.status}

                          </span>

                        </td>

                        <td style={styles.td}>

                          {new Date(
                            visitor.createdAt
                          ).toLocaleDateString()}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </>

      )}

    </div>
    </Layout>
  );
}


// ==============================
// PROFESSIONAL STYLES
// ==============================

const styles = {

  page: {

    minHeight: "100vh",

    padding: "55px",

    background: "#f4f7fb",

  },

  header: {

    marginBottom: "35px",

  },

  title: {

    fontSize: "45px",

    margin: "0 0 10px",

  },

  subtitle: {

    color: "#64748b",

    fontSize: "19px",

  },

  cardContainer: {

    display: "grid",

    gridTemplateColumns:

      "repeat(auto-fit, minmax(230px, 1fr))",

    gap: "25px",

  },

  card: {

    background: "white",

    padding: "32px",

    borderRadius: "16px",

    minHeight: "150px",

    boxShadow:

      "0 10px 25px rgba(15, 23, 42, 0.08)",

  },

  cardTitle: {

    textAlign: "center",

    fontSize: "20px",

  },

  number: {

    textAlign: "center",

    fontSize: "40px",

    margin: "22px 0 12px",

  },

  cardText: {

    color: "#64748b",

    textAlign: "center",

  },

  loading: {

    background: "white",

    padding: "40px",

    borderRadius: "15px",

    textAlign: "center",

  },

  tableCard: {

    background: "white",

    marginTop: "35px",

    padding: "28px",

    borderRadius: "16px",

    boxShadow:

      "0 10px 25px rgba(15, 23, 42, 0.08)",

  },

  tableHeader: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "25px",

  },

  sectionTitle: {

    margin: 0,

  },

  sectionText: {

    color: "#64748b",

  },

  refreshButton: {

    padding: "11px 20px",

    border: "none",

    borderRadius: "8px",

    background: "#2563eb",

    color: "white",

    cursor: "pointer",

  },

  table: {

    width: "100%",

    borderCollapse: "collapse",

  },

  th: {

    textAlign: "left",

    padding: "16px",

    background: "#f1f5f9",

  },

  td: {

    padding: "16px",

    borderBottom:

      "1px solid #e2e8f0",

  },

  badge: {

    padding: "7px 12px",

    borderRadius: "20px",

    fontWeight: "bold",

  },

  empty: {

    padding: "30px",

    textAlign: "center",

    color: "#64748b",

  },

};

export default GuardDashboard;