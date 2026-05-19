import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Layout from "../components/Layout";

function Reports() {
  const [reports, setReports] = useState({});

  const fetchReports = async () => {
    try {
      const res = await axios.get("/reports");
      setReports(res.data);

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
        <h1>Reports Dashboard</h1>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Total Users</h3>
            <h2>{reports.users}</h2>
          </div>

          <div style={styles.card}>
            <h3>Total Complaints</h3>
            <h2>{reports.complaints}</h2>
          </div>

          <div style={styles.card}>
            <h3>Total Bookings</h3>
            <h2>{reports.bookings}</h2>
          </div>

          <div style={styles.card}>
            <h3>Total Maintenance</h3>
            <h2>{reports.maintenance}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;

const styles = {
  container: {
    padding: "20px",
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
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },
};