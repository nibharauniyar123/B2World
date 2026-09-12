import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PendingVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/visitors");
      setVisitors(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load pending visitors");
    } finally {
      setLoading(false);
    }
  };

  const pendingVisitors = visitors.filter(
    (visitor) => visitor.status === "PENDING"
  );

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/visitors/${id}/status`, {
        status: "APPROVED",
      });

      toast.success("Visitor Approved Successfully");
      fetchVisitors();
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve visitor");
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this visitor?"
    );

    if (!confirmReject) return;

    try {
      await axios.put(`/api/visitors/${id}/status`, {
        status: "REJECTED",
      });

      toast.success("Visitor Rejected Successfully");
      fetchVisitors();
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject visitor");
    }
  };

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Header */}
      <h1 style={styles.title}>Pending Visitors</h1>

      {/* Total Pending Card */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Total Pending Visitors</h3>
        <h1 style={styles.cardCount}>{pendingVisitors.length}</h1>
      </div>

      {/* Loading */}
      {loading ? (
        <div style={styles.loading}>
          <h3>Loading Pending Visitors...</h3>
        </div>
      ) : (
        <div style={styles.tableCard}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Purpose</th>
                  <th style={styles.th}>Vehicle No.</th>
                  <th style={styles.th}>Delivery</th>
                  <th style={styles.th}>Created Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {pendingVisitors.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={styles.empty}>
                      No Pending Visitors
                    </td>
                  </tr>
                ) : (
                  pendingVisitors.map((visitor) => (
                    <tr key={visitor.id} style={styles.tr}>
                      <td style={styles.td}>{visitor.name}</td>

                      <td style={styles.td}>{visitor.phone}</td>

                      <td style={styles.td}>{visitor.purpose}</td>

                      <td style={styles.td}>
                        {visitor.vehicleNumber || "-"}
                      </td>

                      <td style={styles.td}>
                        {visitor.deliveryType || "-"}
                      </td>

                      <td style={styles.td}>
                        {new Date(
                          visitor.createdAt
                        ).toLocaleDateString()}{" "}
                        <br />
                        <small>
                          {new Date(
                            visitor.createdAt
                          ).toLocaleTimeString()}
                        </small>
                      </td>

                      <td style={styles.td}>
                        <span style={styles.pendingBadge}>
                          🟠 Pending
                        </span>
                      </td>

                      <td style={styles.td}>
                        <button
                          style={styles.approveBtn}
                          onClick={() => handleApprove(visitor.id)}
                        >
                          Approve
                        </button>

                        <button
                          style={styles.rejectBtn}
                          onClick={() => handleReject(visitor.id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
const styles = {
  page: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#1e293b",
  },

  card: {
    width: "280px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
  },

  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },

  cardCount: {
    marginTop: "15px",
    marginBottom: 0,
    fontSize: "42px",
    fontWeight: "bold",
  },

  loading: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "950px",
  },

  th: {
    background: "#2563eb",
    color: "#fff",
    padding: "15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
    verticalAlign: "middle",
  },

  tr: {
    transition: "0.3s",
  },

  pendingBadge: {
    background: "#f59e0b",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
  },

  approveBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "8px",
    fontWeight: "600",
    transition: "0.3s",
  },

  rejectBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },

  empty: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280",
    fontWeight: "600",
    fontSize: "17px",
  },
};

export default PendingVisitors;