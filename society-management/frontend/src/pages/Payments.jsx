// import { useEffect, useState } from "react";
// import axios from "../utils/axios";
// // import jsPDF from "jspdf";

// function Payments() {
//   const [payments, setPayments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("ALL");

//   const [form, setForm] = useState({
//     userId: "",
//     amount: "",
//     waterCharge: "",
//     electricityCharge: "",
//     lateFee: "",
//   });

//   const fetchPayments = async () => {
//     try {
//       const res = await axios.get("/api/payments");
//       setPayments(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const filteredPayments = payments.filter((payment) =>
//   payment.user?.name
//     ?.toLowerCase()
//     .includes(search.toLowerCase())
// );

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const handleCreate = async () => {
//     try {
//       await axios.post("/api/payments", form);

//       alert("Payment Generated Successfully");

//       setForm({
//         userId: "",
//         amount: "",
//         waterCharge: "",
//         electricityCharge: "",
//         lateFee: "",
//       });

//       fetchPayments();
//     } catch (error) {
//       console.log(error);
//       alert("Create Failed");
//     }
//   };

//   const markPaid = async (id) => {
//     try {
//       await axios.put(`/api/payments/${id}`);

//       fetchPayments();

//       alert("Payment Marked Paid");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const total =
//     Number(form.amount || 0) +
//     Number(form.waterCharge || 0) +
//     Number(form.electricityCharge || 0) +
//     Number(form.lateFee || 0);

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1>Payment Management</h1>
//       </div>

//       {/* FORM */}

//       <div style={styles.formCard}>
//         <h2>Generate Payment</h2>

//         <div style={styles.formGrid}>
//           <input
//             style={styles.input}
//             placeholder="User ID"
//             value={form.userId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 userId: e.target.value,
//               })
//             }
//           />

//           <input
//             style={styles.input}
//             placeholder="Maintenance Amount"
//             value={form.amount}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 amount: e.target.value,
//               })
//             }
//           />

//           <input
//             style={styles.input}
//             placeholder="Water Charge"
//             value={form.waterCharge}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 waterCharge: e.target.value,
//               })
//             }
//           />

//           <input
//             style={styles.input}
//             placeholder="Electricity Charge"
//             value={form.electricityCharge}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 electricityCharge: e.target.value,
//               })
//             }
//           />

//           <input
//             style={styles.input}
//             placeholder="Late Fee"
//             value={form.lateFee}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 lateFee: e.target.value,
//               })
//             }
//           />

//           <input
//   style={styles.input}
//   placeholder="Search by User Name..."
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
// />
//         </div>

//         <div style={styles.totalBox}>
//           Total Amount: ₹ {total}
//         </div>

//         <button
//           style={styles.generateBtn}
//           onClick={handleCreate}
//         >
//           Generate Payment
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}

//       <div style={styles.cards}>
//         <div style={styles.card}>
//           <h3>Total Payments</h3>
//           <p>{payments.length}</p>
//         </div>

//         <div style={styles.card}>
//           <h3>Paid</h3>
//           <p>
//             {
//               payments.filter(
//                 (p) => p.status === "PAID"
//               ).length
//             }
//           </p>
//         </div>

//         <div style={styles.card}>
//           <h3>Pending</h3>
//           <p>
//             {
//               payments.filter(
//                 (p) => p.status === "PENDING"
//               ).length
//             }
//           </p>
//         </div>
//       </div>

//       {/* TABLE */}

//       <div style={styles.tableCard}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Maintenance</th>
//               <th>Water</th>
//               <th>Electricity</th>
//               <th>Late Fee</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredPayments.map((payment) => (
//               <tr key={payment.id}>
//                 <td>{payment.user?.name}</td>

//                 <td>₹ {payment.amount}</td>

//                 <td>₹ {payment.waterCharge}</td>

//                 <td>
//                   ₹ {payment.electricityCharge}
//                 </td>

//                 <td>₹ {payment.lateFee}</td>

//                 <td>
//                   <strong>
//                     ₹ {payment.totalAmount}
//                   </strong>
//                 </td>

//                 <td>
//                   <span
//                     style={{
//                       color:
//                         payment.status === "PAID"
//                           ? "green"
//                           : "red",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {payment.status}
//                   </span>
//                 </td>

//                 <td>
//                   {payment.status ===
//                     "PENDING" && (
//                     <button
//                       style={styles.payBtn}
//                       onClick={() =>
//                         markPaid(payment.id)
//                       }
//                     >
//                       Mark Paid
//                     </button>

//                   )}
//                 </td>
             

//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {payments.length === 0 && (
//           <p style={{ textAlign: "center" }}>
//             No Payments Found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "25px",
//     background: "#f1f5f9",
//     minHeight: "100vh",
//   },

//   header: {
//     marginBottom: "20px",
//   },

//   formCard: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     marginBottom: "25px",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//   },

//   formGrid: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(220px,1fr))",
//     gap: "15px",
//     marginTop: "15px",
//   },

//   input: {
//     padding: "12px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//   },

//   totalBox: {
//     marginTop: "20px",
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#2563eb",
//   },

//   generateBtn: {
//     marginTop: "20px",
//     background: "#2563eb",
//     color: "#fff",
//     border: "none",
//     padding: "12px 20px",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },

//   cards: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(200px,1fr))",
//     gap: "20px",
//     marginBottom: "25px",
//   },

//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     textAlign: "center",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//   },

//   tableCard: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//     overflowX: "auto",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },

//   payBtn: {
//     background: "#16a34a",
//     color: "#fff",
//     border: "none",
//     padding: "8px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// //   invoiceBtn: {
// //   background: "#7c3aed",
// //   color: "#fff",
// //   border: "none",
// //   padding: "8px 12px",
// //   borderRadius: "6px",
// //   cursor: "pointer",
// // },
// };

// export default Payments;
import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Payments() {
  // ============================
  // STATES
  // ============================

  const [payments, setPayments] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("ALL");

  // const [form, setForm] = useState({
  //   userId: "",
  //   amount: "",
  //   waterCharge: "",
  //   electricityCharge: "",
  //   lateFee: "",
  // });
const [form,setForm]=useState({

userId:"",
amount:"",
waterCharge:"",
electricityCharge:"",
lateFee:"",

month:"",
dueDate:"",
societyId:""

})

  // ============================
  // FETCH PAYMENTS
  // ============================

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/api/payments");

      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ============================
  // SEARCH + FILTER
  // ============================

  const filteredPayments = payments.filter((payment) => {
    const matchSearch =
      payment.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      filter === "ALL"
        ? true
        : payment.status === filter;

    return matchSearch && matchStatus;
  });

  // ============================
  // TOTAL CALCULATION
  // ============================

  const total =
    Number(form.amount || 0) +
    Number(form.waterCharge || 0) +
    Number(form.electricityCharge || 0) +
    Number(form.lateFee || 0);

  // ============================
  // CREATE PAYMENT
  // ============================

  const handleCreate = async () => {
    try {
      await axios.post("/api/payments", form);

      alert("Payment Generated Successfully");

      setForm({
        userId: "",
        amount: "",
        waterCharge: "",
        electricityCharge: "",
        lateFee: "",
      });

      fetchPayments();
    } catch (err) {
      console.log(err);

      alert("Failed to Create Payment");
    }
  };
  // ============================
// MARK AS PAID
// ============================

const markPaid = async (id) => {
  try {
    await axios.put(`/api/payments/${id}`);

    fetchPayments();

    alert("Payment Marked as Paid");
  } catch (err) {
    console.log(err);
  }
};

// ============================
// DELETE PAYMENT
// ============================

const deletePayment = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this payment?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`/api/payments/${id}`);

    fetchPayments();

    alert("Payment Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
};

// ============================
// EDIT PAYMENT
// (Temporary)
// ============================

const editPayment = (payment) => {
  setForm({
    userId: payment.userId,
    amount: payment.amount,
    waterCharge: payment.waterCharge,
    electricityCharge: payment.electricityCharge,
    lateFee: payment.lateFee,
  });

  alert(
    "Form filled. Update API will be added in next step."
  );
};

// ============================
// DOWNLOAD INVOICE
// ============================

const downloadInvoice = (payment) => {
  alert(
    `Invoice for ${payment.user?.name} will be generated in Invoice Module.`
  );
};

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Payment Management
      </h1>

      {/* ===========================
            SEARCH + FILTER
      ============================ */}

      <div style={styles.topBar}>
        <input
          style={styles.input}
          placeholder="Search User..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          style={styles.select}
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="ALL">
            All Payments
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="PENDING">
            Pending
          </option>
        </select>
      </div>

      {/* ===========================
            PAYMENT FORM
      ============================ */}

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
            placeholder="Maintenance"
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
                waterCharge:
                  e.target.value,
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
                electricityCharge:
                  e.target.value,
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
          <input
placeholder="Month"
value={form.month}
onChange={(e)=>
setForm({...form,month:e.target.value})
}
/>

<input
type="date"
value={form.dueDate}
onChange={(e)=>
setForm({...form,dueDate:e.target.value})
}
/>

<input
placeholder="Society ID"
value={form.societyId}
onChange={(e)=>
setForm({...form,societyId:e.target.value})
}
/>
        </div>

        <h2
          style={{
            color: "#2563eb",
            marginTop: "20px",
          }}
        >
          Total : Rs. {total}
        </h2>

        <button
          style={styles.generateBtn}
          onClick={handleCreate}
        >
          Generate Payment
        </button>
      </div>

      {/* ===========================
            SUMMARY CARDS
      ============================ */}

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Payments</h3>

          <h1>{payments.length}</h1>
        </div>

        <div style={styles.card}>
          <h3>Paid</h3>

          <h1>
            {
              payments.filter(
                (p) =>
                  p.status === "PAID"
              ).length
            }
          </h1>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>

          <h1>
            {
              payments.filter(
                (p) =>
                  p.status ===
                  "PENDING"
              ).length
            }
          </h1>
        </div>

        <div style={styles.card}>
          <h3>Total Revenue</h3>

          <h1>
            Rs.
            {payments.reduce(
              (sum, p) =>
                sum +
                Number(
                  p.totalAmount || 0
                ),
              0
            )}
          </h1>
        </div>
      </div>

      {/* PART 2 HERE */}
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

        <th>Actions</th>

      </tr>

    </thead>

    <tbody>

      {filteredPayments.map((payment) => (

        <tr key={payment.id}>

          <td>{payment.user?.name}</td>

          <td>Rs. {payment.amount}</td>

          <td>Rs. {payment.waterCharge}</td>

          <td>Rs. {payment.electricityCharge}</td>

          <td>Rs. {payment.lateFee}</td>

          <td>
            <strong>
              Rs. {payment.totalAmount}
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

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >

              {payment.status ===
                "PENDING" && (

                <button
                  style={styles.payBtn}
                  onClick={() =>
                    markPaid(payment.id)
                  }
                >
                  Paid
                </button>

              )}

              <button
                style={styles.editBtn}
                onClick={() =>
                  editPayment(payment)
                }
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  deletePayment(payment.id)
                }
              >
                Delete
              </button>

              <button
                style={styles.invoiceBtn}
                onClick={() =>
                  downloadInvoice(payment)
                }
              >
                Invoice
              </button>

            </div>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

  {filteredPayments.length === 0 && (
    <h3
      style={{
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      No Payments Found
    </h3>
  )}

</div>
    </div>
  );
}
const styles = {
  container: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  heading: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#1e293b",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: "25px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    width: "200px",
  },

  totalBox: {
    marginTop: "20px",
    fontWeight: "700",
    fontSize: "22px",
    color: "#2563eb",
  },

  generateBtn: {
    marginTop: "20px",
    background: "#2563eb",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  tableCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
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
    borderRadius: "8px",
    cursor: "pointer",
  },

  editBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  invoiceBtn: {
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Payments;
