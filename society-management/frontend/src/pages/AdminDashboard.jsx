
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalResidents: 0,
    totalFlats: 0,
    occupiedFlats: 0,
    vacantFlats: 0,
    occupancyPercentage: 0,
    totalComplaints: 0,
    inprogressComplaints: 0,
    resolvedComplaints: 0,
    openComplaints: 0,
    maintenanceCollection: 0,
     pendingCollection: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH ADMIN DASHBOARD DATA
  // ==========================================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        setStats({
          totalResidents:
            data.residents?.totalResidents || 0,

          totalFlats:
            data.flats?.totalFlats || 0,

          occupiedFlats:
            data.flats?.occupiedFlats || 0,

          vacantFlats:
            data.flats?.vacantFlats || 0,

          occupancyPercentage:
            data.flats?.occupancyPercentage || 0,

          totalComplaints:
            data.complaints?.totalComplaints || 0,

          inprogressComplaints:
            data.complaints?.inprogressComplaints || 0,

          resolvedComplaints:
            data.complaints?.resolvedComplaints || 0,

          openComplaints:
            data.complaints?.openComplaints || 0,

          maintenanceCollection:
            data.maintenance?.maintenanceCollection || 0,

          pendingCollection:
  data.maintenance.pendingCollection,
        });

        setLoading(false);
      } catch (error) {
        console.error("ADMIN DASHBOARD ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data"
        );

        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <Layout>
        <div style={styles.page}>
          <h2>Loading Admin Dashboard...</h2>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <Layout>
        <div style={styles.page}>
          <div style={styles.errorBox}>
            <h3>Dashboard Error</h3>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  return (
    <Layout>
      <div style={styles.page}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              Admin Dashboard
            </h1>

            <p style={styles.sub}>
              Manage your society system
            </p>
          </div>

          <div style={styles.badge}>
            Society Admin
          </div>
        </div>

        {/* =====================================
            STATISTICS CARDS
        ====================================== */}
        <div style={styles.cards}>

          {/* Residents */}
          <div
            style={{
              ...styles.card,
              borderTop: "5px solid #3b82f6",
            }}
          >
            <h3>Total Residents</h3>

            <h1 style={styles.cardValue}>
              {stats.totalResidents}
            </h1>
          </div>

          {/* Occupancy */}
          <div
            style={{
              ...styles.card,
              borderTop: "5px solid #f59e0b",
            }}
          >
            <h3>Occupancy</h3>

            <h1 style={styles.cardValue}>
              {stats.occupancyPercentage}%
            </h1>

            <p>
              {stats.occupiedFlats} occupied /{" "}
              {stats.totalFlats} flats
            </p>
          </div>

          {/* Complaints */}
          <div
            style={{
              ...styles.card,
              borderTop: "5px solid #ef4444",
            }}
          >
            <h3>Total Complaints</h3>

            <h1 style={styles.cardValue}>
              {stats.totalComplaints}
            </h1>

            <p>
              In Progress: {stats.inprogressComplaints}
            </p>
          </div>

          {/* Maintenance Collection */}
           {/* <div
            style={{
              ...styles.card,
              borderTop: "5px solid #22c55e",
            }}
          > */}
            {/* <h3>Maintenance Collection</h3> */}
            
            {/* <h1 style={styles.cardValue}>
              Rs.{" "}
              {Number(
                stats.maintenanceCollection
              ).toLocaleString()}
            </h1>  */}

{/* MAINTENANCE COLLECTION */}
<div style={styles.revenueCard}>

  <h3 style={styles.revenueTitle}>
    Maintenance Collection
  </h3>

  <div style={styles.revenueAmount}>
    Rs.{" "}
    {Number(
      stats.maintenanceCollection || 0
    ).toLocaleString()}
  </div>

  <div style={styles.revenueDetails}>

    {/* PAID AMOUNT */}
    <div style={styles.revenueDetailBox}>

      <span style={styles.revenueDetailLabel}>
        Paid Amount
      </span>

      <strong style={styles.revenuePaid}>
        Rs.{" "}
        {Number(
          stats.maintenanceCollection || 0
        ).toLocaleString()}
      </strong>

    </div>


    {/* PENDING AMOUNT */}
    <div style={styles.revenueDetailBox}>

      <span style={styles.revenueDetailLabel}>
        Pending Amount
      </span>

      <strong style={styles.revenuePending}>
        Rs.{" "}
        {Number(
          stats.pendingCollection || 0
        ).toLocaleString()}
      </strong>

    </div>

  </div>


  {/* TOTAL BILLING */}
  <div style={styles.revenueTotal}>

    <span>
      Total Billing
    </span>

    <strong>
      Rs.{" "}
      {(
        Number(stats.maintenanceCollection || 0) +
        Number(stats.pendingCollection || 0)
      ).toLocaleString()}
    </strong>

  </div>

</div>





          {/* </div> */}

        </div>

        {/* =====================================
            COMPLAINT SUMMARY
        ====================================== */}
        <div style={styles.sectionGrid}>

          <div style={styles.box}>
            <h2>Complaint Summary</h2>

            <div style={styles.summaryRow}>
              <span>Total Complaints</span>
              <strong>
                {stats.totalComplaints}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Open</span>
              <strong>
                {stats.openComplaints}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>In Progress</span>
              <strong>
                {stats.inprogressComplaints}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Resolved</span>
              <strong>
                {stats.resolvedComplaints}
              </strong>
            </div>
          </div>

          {/* =====================================
              OCCUPANCY SUMMARY
          ====================================== */}
          <div style={styles.box}>
            <h2>Occupancy Summary</h2>

            <div style={styles.summaryRow}>
              <span>Total Flats</span>
              <strong>
                {stats.totalFlats}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Occupied Flats</span>
              <strong>
                {stats.occupiedFlats}
              </strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Vacant Flats</span>
              <strong>
                {stats.vacantFlats}
              </strong>
            </div>

            <div style={styles.occupancyBar}>
              <div
                style={{
                  ...styles.occupancyFill,
                  width: `${stats.occupancyPercentage}%`,
                }}
              />
            </div>

            <p style={{ marginTop: "10px" }}>
              Occupancy:{" "}
              <strong>
                {stats.occupancyPercentage}%
              </strong>
            </p>
          </div>

        </div>

                {/* =====================================
            COMPLAINT STATISTICS CHART
        ====================================== */}
        <div style={styles.chartBox}>

          <div style={styles.chartHeader}>
            <div>
              <h2 style={styles.chartTitle}>
                Complaint Statistics
              </h2>

              <p style={styles.chartSubtitle}>
                Complaint status overview
              </p>
            </div>

            <div style={styles.totalComplaintBadge}>
              Total: {stats.totalComplaints}
            </div>
          </div>

          {/* OPEN */}
          <div style={styles.chartRow}>

            <div style={styles.chartLabel}>
              <span>Open</span>

              <strong>
                {stats.openComplaints}
              </strong>
            </div>

            <div style={styles.barBackground}>

              <div
                style={{
                  ...styles.openBar,
                  width:
                    stats.totalComplaints > 0
                      ? `${(
                          (stats.openComplaints /
                            stats.totalComplaints) *
                          100
                        )}%`
                      : "0%",
                }}
              />

            </div>

          </div>


          {/* IN PROGRESS */}
          <div style={styles.chartRow}>

            <div style={styles.chartLabel}>
              <span>In Progress</span>

              <strong>
                {stats.inprogressComplaints}
              </strong>
            </div>

            <div style={styles.barBackground}>

              <div
                style={{
                  ...styles.progressBar,
                  width:
                    stats.totalComplaints > 0
                      ? `${(
                          (stats.inprogressComplaints /
                            stats.totalComplaints) *
                          100
                        )}%`
                      : "0%",
                }}
              />

            </div>

          </div>


          {/* RESOLVED */}
          <div style={styles.chartRow}>

            <div style={styles.chartLabel}>
              <span>Resolved</span>

              <strong>
                {stats.resolvedComplaints}
              </strong>
            </div>

            <div style={styles.barBackground}>

              <div
                style={{
                  ...styles.resolvedBar,
                  width:
                    stats.totalComplaints > 0
                      ? `${(
                          (stats.resolvedComplaints /
                            stats.totalComplaints) *
                          100
                        )}%`
                      : "0%",
                }}
              />

            </div>

          </div>

        </div>

        {/* =====================================
    OCCUPANCY STATISTICS CHART
===================================== */}
<div style={styles.occupancyChartBox}>

  <div style={styles.chartHeader}>
    <div>
      <h2 style={styles.chartTitle}>
        Occupancy Statistics
      </h2>

      <p style={styles.chartSubtitle}>
        Flat occupancy overview
      </p>
    </div>

    <div style={styles.occupancyPercentageBadge}>
      {stats.occupancyPercentage}% Occupied
    </div>
  </div>

  {/* OCCUPIED */}
  <div style={styles.chartRow}>

    <div style={styles.chartLabel}>
      <span>Occupied Flats</span>

      <strong>
        {stats.occupiedFlats}
      </strong>
    </div>

    <div style={styles.barBackground}>

      <div
        style={{
          ...styles.occupiedBar,

          width:
            stats.totalFlats > 0
              ? `${(stats.occupiedFlats / stats.totalFlats) * 100}%`
              : "0%",
        }}
      />

    </div>

  </div>


  {/* VACANT */}
  <div style={styles.chartRow}>

    <div style={styles.chartLabel}>
      <span>Vacant Flats</span>

      <strong>
        {stats.vacantFlats}
      </strong>
    </div>

    <div style={styles.barBackground}>

      <div
        style={{
          ...styles.vacantBar,

          width:
            stats.totalFlats > 0
              ? `${(stats.vacantFlats / stats.totalFlats) * 100}%`
              : "0%",
        }}
      />

    </div>

  </div>


  {/* TOTAL */}
  <div style={styles.occupancyTotal}>

    <span>
      Total Flats
    </span>

    <strong>
      {stats.totalFlats}
    </strong>

  </div>

</div>
{/* =====================================
    COLLECTION STATUS
===================================== */}
<div style={styles.collectionChartBox}>

  <div style={styles.chartHeader}>

    <div>
      <h2 style={styles.chartTitle}>
        Collection Status
      </h2>

      <p style={styles.chartSubtitle}>
        Paid vs pending maintenance collection
      </p>
    </div>

  </div>


  {/* PAID COLLECTION */}
  <div style={styles.chartRow}>

    <div style={styles.chartLabel}>
      <span>Paid</span>

      <strong>
        Rs.{" "}
        {Number(
          stats.maintenanceCollection || 0
        ).toLocaleString()}
      </strong>
    </div>

    <div style={styles.barBackground}>

      <div
        style={{
          ...styles.collectionPaidBar,

          width:
            Number(stats.maintenanceCollection || 0) +
              Number(stats.pendingCollection || 0) >
            0
              ? `${
                  (Number(
                    stats.maintenanceCollection || 0
                  ) /
                    (Number(
                      stats.maintenanceCollection || 0
                    ) +
                      Number(
                        stats.pendingCollection || 0
                      ))) *
                  100
                }%`
              : "0%",
        }}
      />

    </div>

  </div>


  {/* PENDING COLLECTION */}
  <div style={styles.chartRow}>

    <div style={styles.chartLabel}>
      <span>Pending</span>

      <strong>
        Rs.{" "}
        {Number(
          stats.pendingCollection || 0
        ).toLocaleString()}
      </strong>
    </div>

    <div style={styles.barBackground}>

      <div
        style={{
          ...styles.collectionPendingBar,

          width:
            Number(stats.maintenanceCollection || 0) +
              Number(stats.pendingCollection || 0) >
            0
              ? `${
                  (Number(
                    stats.pendingCollection || 0
                  ) /
                    (Number(
                      stats.maintenanceCollection || 0
                    ) +
                      Number(
                        stats.pendingCollection || 0
                      ))) *
                  100
                }%`
              : "0%",
        }}
      />

    </div>

  </div>

</div>

        {/* =====================================
            QUICK ACTIONS
        ====================================== */}
        <div style={styles.box}>
          <h2>Quick Actions</h2>

          <div style={styles.actionGrid}>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/users")}
            >
              ➕ Manage Residents
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/flats")}
            >
              🏠 Manage Flats
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/complaints")}
            >
              📢 Complaints
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/maintenance")}
            >
              💰 Maintenance
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/notices")}
            >
              📢 Notices
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => navigate("/reports")}
            >
              📊 Reports
            </button>

          </div>
        </div>

      </div>
    </Layout>
  );
}
        
export default AdminDashboard;


// ==========================================
// STYLES
// ==========================================

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
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.08)",
  },

  cardValue: {
    fontSize: "34px",
    fontWeight: "700",
    margin: "10px 0",
  },

  sectionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
    marginBottom: "20px",
  },

  box: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom:
      "1px solid #e5e7eb",
  },

  occupancyBar: {
    width: "100%",
    height: "15px",
    background: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "20px",
  },

  occupancyFill: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "10px",
    transition: "width 0.5s",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
  },

  actionBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
  chartBox: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },

  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    gap: "15px",
    flexWrap: "wrap",
  },

  chartTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
  },

  chartSubtitle: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  totalComplaintBadge: {
    background: "#f3f4f6",
    color: "#111827",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "600",
  },

  chartRow: {
    marginBottom: "22px",
  },

  chartLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    color: "#374151",
    fontSize: "15px",
  },

  barBackground: {
    width: "100%",
    height: "18px",
    background: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
  },

  openBar: {
    height: "100%",
    background: "#f59e0b",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  progressBar: {
    height: "100%",
    background: "#3b82f6",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  resolvedBar: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },
    occupancyChartBox: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },

  occupancyPercentageBadge: {
    background: "#dcfce7",
    color: "#166534",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "14px",
  },

  occupiedBar: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  vacantBar: {
    height: "100%",
    background: "#ef4444",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  occupancyTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "25px",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "15px",
  },

    collectionChartBox: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },

  collectionPaidBar: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  collectionPendingBar: {
    height: "100%",
    background: "#ef4444",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

    revenueCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    borderTop: "5px solid #22c55e",
  },

  revenueTitle: {
    margin: "0 0 12px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
  },

  revenueAmount: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "20px",
  },

  revenueDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  revenueDetailBox: {
    background: "#f8fafc",
    padding: "12px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  revenueDetailLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },

  revenuePaid: {
    fontSize: "16px",
    color: "#16a34a",
  },

  revenuePending: {
    fontSize: "16px",
    color: "#dc2626",
  },

  revenueTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    paddingTop: "12px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#374151",
  },
  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "20px",
    borderRadius: "12px",
  },
};
