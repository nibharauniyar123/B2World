import { useEffect, useState } from "react";
import axios from "../utils/axios";
import QRCode from "react-qr-code";

function ApprovedVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVisitors = async () => {
    try {
      const res = await axios.get("/api/visitors");

      const approved = res.data.filter(
        (v) => v.status === "APPROVED"
      );

      setVisitors(approved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>Approved Visitors</h1>

      <input
        style={styles.search}
        placeholder="Search Visitor..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Visitor</th>
              <th>Flat No</th>
              <th>Approved By</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredVisitors.map((visitor) => (
              <tr key={visitor.id}>
                <td>
                  {new Date(
                    visitor.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>{visitor.name}</td>

                <td>
                  {visitor.flat?.flatNumber}
                </td>

                <td>
                  {visitor.user?.name}
                </td>

                <td>
                  {new Date(
                    visitor.checkIn
                  ).toLocaleTimeString()}
                </td>

                <td>
                  {visitor.checkOut
                    ? new Date(
                        visitor.checkOut
                      ).toLocaleTimeString()
                    : "-"}
                </td>

                <td>
                  <span style={styles.badge}>
                    APPROVED
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVisitors.length === 0 && (
          <h3
            style={{
              textAlign: "center",
              padding: 20,
            }}
          >
            No Approved Visitors
          </h3>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "25px",
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  search: {
    width: "300px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  tableCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 5px 15px rgba(0,0,0,.08)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  badge: {
    background: "#16a34a",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  },
};

export default ApprovedVisitors;