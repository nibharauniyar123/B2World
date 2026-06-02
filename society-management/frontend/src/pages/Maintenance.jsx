// import {
//   useEffect,
//   useState,
// } from "react";

// import axios from "../utils/axios";

// function Maintenance() {
//   const [data, setData] =
//     useState([]);

//   const [users, setUsers] =
//     useState([]);

//   const [form, setForm] =
//     useState({
//       amount: "",
//       month: "",
//       userId: "",
//     });

//   const [loading, setLoading] =
//     useState(false);

//   const fetchData =
//     async () => {
//       const res =
//         await axios.get(
//           "/maintenance"
//         );

//       const userRes =
//         await axios.get(
//           "/users"
//         );

//       setData(
//         res.data
//       );

//       setUsers(
//         userRes.data.users ||
//           userRes.data
//       );
//     };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCreate =
//     async (e) => {
//       e.preventDefault();

//       try {
//         setLoading(true);

//         await axios.post(
//           "/maintenance",
//           form
//         );

//         setForm({
//           amount: "",
//           month: "",
//           userId: "",
//         });

//         fetchData();
//       } catch {
//         alert(
//           "Create Failed"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//   const handleDelete =
//     async (id) => {
//       await axios.delete(
//         `/maintenance/${id}`
//       );

//       fetchData();
//     };

//   const updateStatus =
//     async (
//       id,
//       status
//     ) => {
//       await axios.put(
//         `/maintenance/${id}`,
//         { status }
//       );

//       fetchData();
//     };

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.title}>
//         Maintenance
//         Management
//       </h1>

//       {/* FORM */}
//       <form
//         onSubmit={
//           handleCreate
//         }
//         style={styles.form}
//       >
//         <input
//           placeholder="Amount"
//           value={
//             form.amount
//           }
//           onChange={(e) =>
//             setForm({
//               ...form,
//               amount:
//                 e.target
//                   .value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         <input
//           placeholder="Month"
//           value={
//             form.month
//           }
//           onChange={(e) =>
//             setForm({
//               ...form,
//               month:
//                 e.target
//                   .value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         <select
//           value={
//             form.userId
//           }
//           onChange={(e) =>
//             setForm({
//               ...form,
//               userId:
//                 e.target
//                   .value,
//             })
//           }
//           style={styles.input}
//           required
//         >
//           <option value="">
//             Select User
//           </option>

//           {users.map(
//             (
//               user
//             ) => (
//               <option
//                 key={
//                   user.id
//                 }
//                 value={
//                   user.id
//                 }
//               >
//                 {
//                   user.name
//                 }
//               </option>
//             )
//           )}
//         </select>

//         <button
//           style={
//             styles.button
//           }
//         >
//           {loading
//             ? "Adding..."
//             : "Add Bill"}
//         </button>
//       </form>

//       {/* TABLE */}
//       <div
//         style={
//           styles.card
//         }
//       >
//         <table
//           style={
//             styles.table
//           }
//         >
//           <thead>
//             <tr>
//               <th
//                 style={
//                   styles.th
//                 }
//               >
//                 Amount
//               </th>
//               <th
//                 style={
//                   styles.th
//                 }
//               >
//                 Month
//               </th>
//               <th
//                 style={
//                   styles.th
//                 }
//               >
//                 Status
//               </th>
//               <th
//                 style={
//                   styles.th
//                 }
//               >
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map(
//               (
//                 item
//               ) => (
//                 <tr
//                   key={
//                     item.id
//                   }
//                 >
//                   <td
//                     style={
//                       styles.td
//                     }
//                   >
//                     Rs{" "}
//                     {
//                       item.amount
//                     }
//                   </td>

//                   <td
//                     style={
//                       styles.td
//                     }
//                   >
//                     {
//                       item.month
//                     }
//                   </td>

//                   <td
//                     style={
//                       styles.td
//                     }
//                   >
//                     <select
//                       value={
//                         item.status
//                       }
//                       onChange={(
//                         e
//                       ) =>
//                         updateStatus(
//                           item.id,
//                           e
//                             .target
//                             .value
//                         )
//                       }
//                       style={
//                         styles.input
//                       }
//                     >
//                       <option>
//                         PENDING
//                       </option>
//                       <option>
//                         PAID
//                       </option>
//                     </select>
//                   </td>

//                   <td
//                     style={
//                       styles.td
//                     }
//                   >
//                     <button
//                       onClick={() =>
//                         handleDelete(
//                           item.id
//                         )
//                       }
//                       style={
//                         styles.delete
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Maintenance;

// // CSS
// const styles = {
//   page: {
//     padding: "30px",
//     background:
//       "#f4f7fb",
//     minHeight:
//       "100vh",
//   },

//   title: {
//     fontSize:
//       "38px",
//     fontWeight:
//       "700",
//     marginBottom:
//       "25px",
//   },

//   form: {
//     display:
//       "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(220px,1fr))",
//     gap: "15px",
//     background:
//       "#fff",
//     padding:
//       "25px",
//     borderRadius:
//       "18px",
//     marginBottom:
//       "30px",
//   },

//   input: {
//     padding:
//       "14px",
//     border:
//       "1px solid #ddd",
//     borderRadius:
//       "12px",
//   },

//   button: {
//     background:
//       "#2563eb",
//     color:
//       "#fff",
//     border:
//       "none",
//     borderRadius:
//       "12px",
//     cursor:
//       "pointer",
//     fontWeight:
//       "600",
//   },

//   card: {
//     background:
//       "#fff",
//     borderRadius:
//       "18px",
//     overflow:
//       "hidden",
//   },

//   table: {
//     width: "100%",
//     borderCollapse:
//       "collapse",
//   },

//   th: {
//     background:
//       "#eef2f7",
//     padding:
//       "16px",
//     textAlign:
//       "left",
//   },

//   td: {
//     padding:
//       "16px",
//     borderTop:
//       "1px solid #eee",
//   },

//   delete: {
//     background:
//       "#ef4444",
//     color:
//       "#fff",
//     border:
//       "none",
//     padding:
//       "10px 14px",
//     borderRadius:
//       "10px",
//     cursor:
//       "pointer",
//   },
// };
import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Maintenance() {
const [bills, setBills] = useState([]);
const [amount, setAmount] = useState("");
const [month, setMonth] = useState("");
const [dueDate, setDueDate] = useState("");
const [userId, setUserId] = useState("");

  const loadBills = async () => {
    try {
      const res = await axios.get("/maintenance");
      setBills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const generateBill = async () => {
    try {
      await axios.post("/maintenance", {
        userId, 
        amount,
        month,
        dueDate,
      });

      alert("Bill Generated Successfully");

      loadBills();
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  const markPaid = async (id) => {
    try {
      await axios.put(`/maintenance/${id}`);

      alert("Bill Paid");

      loadBills();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Maintenance Billing</h1>
<div style={styles.form}>
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />

  <input
    type="text"
    placeholder="Month"
    value={month}
    onChange={(e) => setMonth(e.target.value)}
  />

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
  />

  <input
    type="number"
    placeholder="User ID"
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
  />

  <button style={styles.generateBtn} onClick={generateBill}>
    Generate Bill
  </button>
</div>
</div>
        {/* {/* <button style={styles.generateBtn} onClick={generateBill}>
          Generate Bill
        </button>
       </div>  */}

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
             <th style={styles.th}>User</th>
<th style={styles.th}>Month</th>
<th style={styles.th}>Amount</th>
<th style={styles.th}>GST</th>
<th style={styles.th}>Late Fee</th>
<th style={styles.th}>Total</th>
<th style={styles.th}>Status</th>
<th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td style={styles.td}>{bill.user?.name}</td>

                <td style={styles.td}>{bill.month}</td>

                <td style={styles.td}>Rs {bill.amount}</td>

                <td style={styles.td}>Rs {bill.gst}</td>

                <td style={styles.td}>Rs {bill.lateFee}</td>

                <td style={styles.td}>
                  <strong>Rs {bill.total}</strong>
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      color:
                        bill.status === "PAID"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {bill.status}
                  </span>
                </td>

                <td style={styles.td}>
                  {bill.status === "PENDING" && (
                    <button
                      style={styles.payBtn}
                      onClick={() => markPaid(bill.id)}
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bills.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No Bills Found
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  generateBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  card: {
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
  th: {
  background: "#2563eb",
  color: "#fff",
  padding: "12px",
},

td: {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "center",
},

  payBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  form: {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap",
},
};

export default Maintenance;