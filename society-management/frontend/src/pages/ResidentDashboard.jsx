import Layout from "../components/Layout";

function ResidentDashboard() {
  const data = {
    complaints: 3,
    bookings: 1,
    notices: 5,
    dueAmount: 0,
  };

  return (
    <Layout>
      <div style={{ padding: "30px" }}>
        <h1>Resident Dashboard</h1>
        <p>Society Management Overview</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={styles.card}>
            <h3>My Complaints</h3>
            <h1>{data.complaints}</h1>
          </div>

          <div style={styles.card}>
            <h3>My Bookings</h3>
            <h1>{data.bookings}</h1>
          </div>

          <div style={styles.card}>
            <h3>My Notices</h3>
            <h1>{data.notices}</h1>
          </div>

          <div style={styles.card}>
            <h3>My Due Amount</h3>
            <h1>Rs. {data.dueAmount}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ResidentDashboard;

const styles = {
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      transition: "0.3s",
  cursor: "pointer",
  },

};