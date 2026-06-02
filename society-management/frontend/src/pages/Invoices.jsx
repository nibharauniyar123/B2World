import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { jsPDF } from "jspdf";

function Invoices() {
  const [payments, setPayments] = useState([]);

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

  const downloadInvoice = (payment) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Society Management Invoice", 20, 20);

  const gst = payment.totalAmount * 0.13;

  doc.setFontSize(12);

  doc.text(`Invoice No: INV-${payment.id}`, 20, 40);
  doc.text(`User: ${payment.user?.name}`, 20, 55);
  doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`, 20, 70);

  doc.text(`Maintenance: Rs ${payment.amount}`, 20, 90);
  doc.text(`Water Charge: Rs ${payment.waterCharge}`, 20, 105);
  doc.text(`Electricity: Rs ${payment.electricityCharge}`, 20, 120);
  doc.text(`Late Fee: Rs ${payment.lateFee}`, 20, 135);
  doc.text(`GST: Rs ${gst.toFixed(2)}`, 20, 150);

  doc.setFontSize(14);
  doc.text(`Total Amount: Rs ${payment.totalAmount}`, 20, 170);

  doc.setFontSize(12);
  doc.text(`Status: ${payment.status}`, 20, 185);

  doc.save(`Invoice-${payment.id}.pdf`);
};
  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          color: "#1e293b",
        }}
      >
        Invoice Management
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
                background: "#2563eb",
                color: "#fff",
              }}
            >
              <th style={thStyle}>Invoice</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Maintenance</th>
              <th style={thStyle}>Water</th>
              <th style={thStyle}>Electricity</th>
              <th style={thStyle}>Late Fee</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td style={tdStyle}>
                    INV-{payment.id}
                  </td>

                  <td style={tdStyle}>
                    {payment.user?.name}
                  </td>

                  <td style={tdStyle}>
                    ₹ {payment.amount}
                  </td>

                  <td style={tdStyle}>
                    ₹ {payment.waterCharge}
                  </td>

                  <td style={tdStyle}>
                    ₹ {payment.electricityCharge}
                  </td>

                  <td style={tdStyle}>
                    ₹ {payment.lateFee}
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {payment.totalAmount}
                  </td>

                  <td style={tdStyle}>
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

                  <td style={tdStyle}>
                    {new Date(
                      payment.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>
                    <button
                      style={downloadBtn}
                      onClick={() =>
                        downloadInvoice(payment)
                      }
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "center",
                    padding: "20px",
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

const thStyle = {
  padding: "14px",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};

const downloadBtn = {
  background: "#7c3aed",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Invoices;