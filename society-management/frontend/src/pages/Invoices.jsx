import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Invoices() {

  const [payments, setPayments] = useState([]);

  // =========================
  // FETCH PAYMENTS
  // =========================
  const fetchInvoices = async () => {
    try {

      const res = await axios.get("/payments");

      setPayments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      {/* TITLE */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "30px",
        }}
      >
        Invoices
      </h1>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>
            <tr
              style={{
                background: "#e2e8f0",
                textAlign: "left",
              }}
            >
              <th style={thStyle}>Invoice ID</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Maintenance</th>
              <th style={thStyle}>Water</th>
              <th style={thStyle}>Electricity</th>
              <th style={thStyle}>Late Fee</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>

          <tbody>

            {payments.length > 0 ? (

              payments.map((payment, index) => (

                <tr
                  key={payment.id}
                  style={{
                    background:
                      index % 2 === 0
                        ? "#fff"
                        : "#f8fafc",
                  }}
                >

                  <td style={tdStyle}>
                    INV-{payment.id}
                  </td>

                  <td style={tdStyle}>
                    {payment.user?.name}
                  </td>

                  <td style={tdStyle}>
                    Rs. {payment.amount}
                  </td>

                  <td style={tdStyle}>
                    Rs. {payment.waterCharge}
                  </td>

                  <td style={tdStyle}>
                    Rs. {payment.electricityCharge}
                  </td>

                  <td style={tdStyle}>
                    Rs. {payment.lateFee}
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: "700",
                      color: "#2563eb",
                    }}
                  >
                    Rs. {payment.totalAmount}
                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background:
                          payment.status === "PAID"
                            ? "#dcfce7"
                            : "#fee2e2",
                        color:
                          payment.status === "PAID"
                            ? "#166534"
                            : "#991b1b",
                      }}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td style={tdStyle}>
                    {new Date(
                      payment.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              ))

            ) : (

              <tr>
                <td
                  colSpan="9"
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No invoices found
                </td>
              </tr>

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

// =========================
// STYLES
// =========================

const thStyle = {
  padding: "16px",
  fontSize: "15px",
  color: "#334155",
};

const tdStyle = {
  padding: "16px",
  color: "#1e293b",
};

export default Invoices;