import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Payments() {

  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    userId: "",
    amount: "",
    waterCharge: "",
    electricityCharge: "",
    lateFee: "",
  });

  // FETCH PAYMENTS
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

  // CREATE PAYMENT
  const handleCreate = async () => {
    try {

      await axios.post("/payments", form);

      alert("Payment added");

      fetchPayments();

    } catch (error) {

      console.log(error);

      alert("Create failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Payments</h1>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginBottom: "30px",
          maxWidth: "500px",
        }}
      >

        <input
          placeholder="User ID"
          onChange={(e) =>
            setForm({ ...form, userId: e.target.value })
          }
        />

        <input
          placeholder="Maintenance Amount"
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          placeholder="Water Charge"
          onChange={(e) =>
            setForm({
              ...form,
              waterCharge: e.target.value,
            })
          }
        />

        <input
          placeholder="Electricity Charge"
          onChange={(e) =>
            setForm({
              ...form,
              electricityCharge: e.target.value,
            })
          }
        />

        <input
          placeholder="Late Fee"
          onChange={(e) =>
            setForm({
              ...form,
              lateFee: e.target.value,
            })
          }
        />

        <button onClick={handleCreate}>
          Add Payment
        </button>

      </div>

      {/* TABLE */}

      <table width="100%" border="1" cellPadding="10">

        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((payment) => (

            <tr key={payment.id}>

              <td>{payment.user?.name}</td>

              <td>{payment.totalAmount}</td>

              <td>{payment.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Payments;