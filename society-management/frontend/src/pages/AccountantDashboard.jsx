import Layout from "../components/Layout";

function AccountantDashboard() {
  const dashboard = {
    totalPayments: "Rs. 5,20,000",
    totalExpenses: "Rs. 2,15,000",
    pendingBills: 18,
    invoices: 54,
  };

  const recentPayments = [
    {
      resident: "Ram Sharma",
      amount: "Rs. 5000",
      status: "Paid",
    },
    {
      resident: "Hari KC",
      amount: "Rs. 3500",
      status: "Paid",
    },
    {
      resident: "Sita Rai",
      amount: "Rs. 7000",
      status: "Pending",
    },
  ];

  const recentExpenses = [
    {
      title: "Electricity",
      amount: "Rs. 12000",
    },
    {
      title: "Cleaning",
      amount: "Rs. 8000",
    },
    {
      title: "Security Salary",
      amount: "Rs. 25000",
    },
  ];

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Accountant Dashboard</h1>
        <p style={styles.subtitle}>
          Financial Management Overview
        </p>

        {/* Dashboard Cards */}

        <div style={styles.cardGrid}>
          <Card
            title="Total Payments"
            value={dashboard.totalPayments}
            color="#2563eb"
          />

          <Card
            title="Total Expenses"
            value={dashboard.totalExpenses}
            color="#ef4444"
          />

          <Card
            title="Pending Bills"
            value={dashboard.pendingBills}
            color="#f59e0b"
          />

          <Card
            title="Invoices Generated"
            value={dashboard.invoices}
            color="#16a34a"
          />
        </div>

        {/* Tables */}

        <div style={styles.sectionGrid}>
          {/* Recent Payments */}

          <div style={styles.box}>
            <h2>Recent Payments</h2>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((item, index) => (
                  <tr key={index}>
                    <td>{item.resident}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Expenses */}

          <div style={styles.box}>
            <h2>Recent Expenses</h2>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {recentExpenses.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom */}

        <div style={styles.bottomGrid}>
          {/* Pending Bills */}

          <div style={styles.box}>
            <h2>Pending Bills</h2>

            <ul style={styles.list}>
              <li>Flat A-101 — Rs. 3500</li>
              <li>Flat B-203 — Rs. 4200</li>
              <li>Flat C-302 — Rs. 5100</li>
            </ul>
          </div>

          {/* Quick Actions */}

          <div style={styles.box}>
            <h2>Quick Actions</h2>

            <button style={styles.button}>
              + Add Payment
            </button>

            <button style={styles.button}>
              + Add Expense
            </button>

            <button style={styles.button}>
              + Generate Invoice
            </button>

            <button style={styles.button}>
              📊 View Reports
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 18,
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        borderTop: `5px solid ${color}`,
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color,
          marginTop: 15,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  title: {
    fontSize: 38,
    marginBottom: 10,
  },

  subtitle: {
    color: "gray",
    marginBottom: 35,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 20,
    marginBottom: 35,
  },

  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginBottom: 25,
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },

  box: {
    background: "#fff",
    padding: 25,
    borderRadius: 18,
    boxShadow: "0 10px 20px rgba(0,0,0,.08)",
  },

  table: {
    width: "100%",
    marginTop: 20,
    borderCollapse: "collapse",
  },

  list: {
    marginTop: 20,
    lineHeight: "35px",
  },

  button: {
    width: "100%",
    padding: 15,
    marginTop: 15,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 16,
  },
};

export default AccountantDashboard;