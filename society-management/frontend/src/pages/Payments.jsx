import { useEffect, useState } from "react";
import axios from "../utils/axios";
// import jsPDF from "jspdf";

function Payments() {
  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    userId: "",
    amount: "",
    waterCharge: "",
    electricityCharge: "",
    lateFee: "",
  });

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/payments");
      setPayments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post("/payments", form);

      alert("Payment Generated Successfully");

      setForm({
        userId: "",
        amount: "",
        waterCharge: "",
        electricityCharge: "",
        lateFee: "",
      });

      fetchPayments();
    } catch (error) {
      console.log(error);
      alert("Create Failed");
    }
  };

  const markPaid = async (id) => {
    try {
      await axios.put(`/payments/${id}`);

      fetchPayments();

      alert("Payment Marked Paid");
    } catch (error) {
      console.log(error);
    }
  };

//   const downloadInvoice = (payment) => {
//   const doc = new jsPDF();

//   const invoiceNo =
//     "INV-" +
//     payment.id.toString().padStart(4, "0");

//   const date = new Date(
//     payment.createdAt
//   ).toLocaleDateString();

//   doc.setFontSize(20);

//   doc.text(
//     "Society Management Invoice",
//     20,
//     20
//   );

//   doc.setFontSize(12);

//   doc.text(
//     `Invoice No: ${invoiceNo}`,
//     20,
//     40
//   );

//   doc.text(
//     `Date: ${date}`,
//     20,
//     50
//   );

//   doc.text(
//     `User Name: ${payment.user?.name}`,
//     20,
//     60
//   );

//   doc.text(
//     `Maintenance: Rs ${payment.amount}`,
//     20,
//     80
//   );

//   doc.text(
//     `Water Charge: Rs ${payment.waterCharge}`,
//     20,
//     90
//   );

//   doc.text(
//     `Electricity Charge: Rs ${payment.electricityCharge}`,
//     20,
//     100
//   );

//   doc.text(
//     `Late Fee: Rs ${payment.lateFee}`,
//     20,
//     110
//   );

//   doc.text(
//     `Total Amount: Rs ${payment.totalAmount}`,
//     20,
//     130
//   );

//   doc.text(
//     `Status: ${payment.status}`,
//     20,
//     140
//   );

//   doc.save(`${invoiceNo}.pdf`);
// };

  const total =
    Number(form.amount || 0) +
    Number(form.waterCharge || 0) +
    Number(form.electricityCharge || 0) +
    Number(form.lateFee || 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Payment Management</h1>
      </div>

      {/* FORM */}

      <div style={styles.formCard}>
        <h2>Generate Payment</h2>

        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="User ID"
            value={form.userId}
            onChange={(e) =>
              setForm({
                ...form,
                userId: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Maintenance Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Water Charge"
            value={form.waterCharge}
            onChange={(e) =>
              setForm({
                ...form,
                waterCharge: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Electricity Charge"
            value={form.electricityCharge}
            onChange={(e) =>
              setForm({
                ...form,
                electricityCharge: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Late Fee"
            value={form.lateFee}
            onChange={(e) =>
              setForm({
                ...form,
                lateFee: e.target.value,
              })
            }
          />
        </div>

        <div style={styles.totalBox}>
          Total Amount: ₹ {total}
        </div>

        <button
          style={styles.generateBtn}
          onClick={handleCreate}
        >
          Generate Payment
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Payments</h3>
          <p>{payments.length}</p>
        </div>

        <div style={styles.card}>
          <h3>Paid</h3>
          <p>
            {
              payments.filter(
                (p) => p.status === "PAID"
              ).length
            }
          </p>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <p>
            {
              payments.filter(
                (p) => p.status === "PENDING"
              ).length
            }
          </p>
        </div>
      </div>

      {/* TABLE */}

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Maintenance</th>
              <th>Water</th>
              <th>Electricity</th>
              <th>Late Fee</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.user?.name}</td>

                <td>₹ {payment.amount}</td>

                <td>₹ {payment.waterCharge}</td>

                <td>
                  ₹ {payment.electricityCharge}
                </td>

                <td>₹ {payment.lateFee}</td>

                <td>
                  <strong>
                    ₹ {payment.totalAmount}
                  </strong>
                </td>

                <td>
                  <span
                    style={{
                      color:
                        payment.status === "PAID"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {payment.status}
                  </span>
                </td>

                <td>
                  {payment.status ===
                    "PENDING" && (
                    <button
                      style={styles.payBtn}
                      onClick={() =>
                        markPaid(payment.id)
                      }
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
                {/* <td>
  {payment.status === "PENDING" ? (
    <button
      style={styles.payBtn}
      onClick={() =>
        markPaid(payment.id)
      }
    >
      Mark Paid
    </button>
  ) : (
    <button
      style={styles.invoiceBtn}
      onClick={() =>
        downloadInvoice(payment)
      }
    >
      Download Invoice
    </button>
  )}
</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No Payments Found
          </p>
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

  header: {
    marginBottom: "20px",
  },

  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  totalBox: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2563eb",
  },

  generateBtn: {
    marginTop: "20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  tableCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  payBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
//   invoiceBtn: {
//   background: "#7c3aed",
//   color: "#fff",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
// },
};

export default Payments;