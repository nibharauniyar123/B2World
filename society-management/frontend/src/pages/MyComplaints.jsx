import { useEffect, useState } from "react";
import axios from "../utils/axios";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {

      const res = await axios.get("/api/complaints");

      const allComplaints = Array.isArray(res.data)
        ? res.data
        : res.data.complaints || [];

      const myComplaints = allComplaints.filter(
        (item) =>
          Number(item.userId) === Number(user?.id)
      );

      setComplaints(myComplaints);

    } catch (error) {

      console.error(
        "My Complaints Error:",
        error.response?.data || error.message
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading complaints...</h2>;
  }

  return (
    <div style={styles.page}>

      <h1>My Complaints</h1>

      {complaints.length === 0 ? (
        <div style={styles.empty}>
          No complaints found.
        </div>
      ) : (

        <div style={styles.grid}>

          {complaints.map((item) => (

            <div key={item.id} style={styles.card}>

              <h2>{item.title}</h2>

              <p>
                {item.description}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {item.status}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Assigned Staff:</strong>{" "}
                {item.assignedStaff || "Not Assigned"}
              </p>

              <p>
                <strong>Vendor:</strong>{" "}
                {item.vendor?.name || "Not Assigned"}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {item.rating || "Not Rated"}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyComplaints;


const styles = {

  page: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
  },

  empty: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
  },

};