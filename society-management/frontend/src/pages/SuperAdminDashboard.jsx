// function SuperAdminDashboard() {
//  return (
//   <div>
//    <h1>Super Admin Dashboard</h1>

//    <div>All Societies</div>
//    <div>Subscriptions</div>
//    <div>Total Revenue</div>
//    <div>Activity Logs</div>
//   </div>
//  );
// }

// export default SuperAdminDashboard;
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./SuperAdminDashboard.css";

const API = "http://localhost:5000";

function SuperAdminDashboard() {
  const [data, setData] = useState({
    societies: [],
    subscriptions: [],
    activityLogs: [],
    stats: {
      totalSocieties: 0,
      totalUsers: 0,
      totalRevenue: 0,
      activeSubscriptions: 0,
      basicPlans: 0,
      premiumPlans: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/api/super-admin/dashboard`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setData(response.data);
    } catch (err) {
      console.error("SUPER ADMIN DASHBOARD ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load Super Admin Dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

//   const formatMoney = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "NPR",
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };
const formatMoney = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
};

  const planData = useMemo(() => {
    return [
      {
        label: "Basic",
        value: data.stats.basicPlans || 0,
      },
      {
        label: "Premium",
        value: data.stats.premiumPlans || 0,
      },
    ];
  }, [data]);

  const maxPlanValue = Math.max(
    ...planData.map((item) => item.value),
    1
  );

  if (loading) {
    return (
      <div className="super-loading">
        <div className="loading-spinner"></div>
        <p>Loading Super Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="super-dashboard">

      {/* HEADER */}
      <div className="super-header">
        <div>
          <p className="super-eyebrow">B2World • GLOBAL CONTROL</p>

          <h1>Super Admin Dashboard</h1>

          <p className="super-subtitle">
            Manage societies, subscriptions, revenue and system activity
            from one place.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchDashboard}
        >
          ↻ Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="dashboard-error">
          <strong>Dashboard Error</strong>
          <span>{error}</span>
          <button onClick={fetchDashboard}>
            Try Again
          </button>
        </div>
      )}

      {/* KPI CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">🏢</div>

          <div>
            <span>Total Societies</span>
            <h2>{data.stats.totalSocieties}</h2>
            <small>Registered societies</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>

          <div>
            <span>Total Users</span>
            <h2>{data.stats.totalUsers}</h2>
            <small>Across all societies</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💳</div>

          <div>
            <span>Active Subscriptions</span>
            <h2>{data.stats.activeSubscriptions}</h2>
            <small>Current subscriptions</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>

          <div>
            <span>Total Revenue</span>
            <h2>{formatMoney(data.stats.totalRevenue)}</h2>
            <small>Subscription revenue</small>
          </div>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="dashboard-main-grid">

        {/* SOCIETY OVERVIEW */}
        <section className="dashboard-card large-card">

          <div className="card-header">
            <div>
              <h3>All Societies</h3>
              <p>Overview of registered societies</p>
            </div>

            <a href="/societies" className="view-link">
              Manage →
            </a>
          </div>

          {data.societies.length === 0 ? (
            <div className="empty-state">
              <div>🏢</div>
              <p>No societies found.</p>
            </div>
          ) : (
            <div className="society-table-wrapper">
              <table className="society-table">

                <thead>
                  <tr>
                    <th>Society</th>
                    <th>Location</th>
                    <th>Users</th>
                    <th>Plan</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data.societies.slice(0, 8).map((society) => (
                    <tr key={society.id}>

                      <td>
                        <strong>{society.name}</strong>
                      </td>

                      <td>
                        {society.city || "-"}
                      </td>

                      <td>
                        {society.userCount || 0}
                      </td>

                      <td>
                        <span
                          className={`plan-badge ${
                            society.plan === "PREMIUM"
                              ? "premium"
                              : "basic"
                          }`}
                        >
                          {society.plan || "BASIC"}
                        </span>
                      </td>

                      {/* <td>
                        <span className="status-badge active">
                          Active
                        </span>
                      </td> */}
                      <td>
  <span
    className={`status-badge ${
      society.subscriptionStatus === "ACTIVE"
        ? "active"
        : society.subscriptionStatus === "EXPIRED"
        ? "expired"
        : "inactive"
    }`}
  >
    {society.subscriptionStatus === "ACTIVE"
      ? "Active"
      : society.subscriptionStatus === "EXPIRED"
      ? "Expired"
      : "No Subscription"}
  </span>
</td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

        {/* SUBSCRIPTIONS */}
        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <h3>Subscriptions</h3>
              <p>Plan distribution</p>
            </div>

            <a
              href="/subscriptions"
              className="view-link"
            >
              Manage →
            </a>
          </div>

          <div className="chart">

            {planData.map((item) => (
              <div className="bar-row" key={item.label}>

                <div className="bar-label">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <div className="bar-background">
                  <div
                    className={`bar ${
                      item.label === "Premium"
                        ? "premium-bar"
                        : "basic-bar"
                    }`}
                    style={{
                      width: `${
                        (item.value / maxPlanValue) * 100
                      }%`,
                    }}
                  ></div>
                </div>

              </div>
            ))}

          </div>

          <div className="subscription-summary">

            <div>
              <span>Basic</span>
              <strong>{data.stats.basicPlans}</strong>
            </div>

            <div>
              <span>Premium</span>
              <strong>{data.stats.premiumPlans}</strong>
            </div>

          </div>

        </section>

      </div>

      {/* ACTIVITY LOG */}
      <section className="dashboard-card activity-card">

        <div className="card-header">

          <div>
            <h3>Recent Activity Logs</h3>
            <p>Latest system activities</p>
          </div>

          <a
            href="/activity-logs"
            className="view-link"
          >
            View All →
          </a>

        </div>

        {data.activityLogs.length === 0 ? (
          <div className="empty-state">
            <div>📋</div>
            <p>No activity logs available.</p>
          </div>
        ) : (
          <div className="activity-list">

            {data.activityLogs
              .slice(0, 8)
              .map((log) => (

                <div
                  className="activity-item"
                  key={log.id}
                >

                  <div className="activity-icon">
                    ✓
                  </div>

                  <div className="activity-content">

                    <strong>
                      {log.userName || "System User"}
                    </strong>

                    <span>
                      {log.action}
                    </span>

                  </div>

                  <time>
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </time>

                </div>

              ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default SuperAdminDashboard;