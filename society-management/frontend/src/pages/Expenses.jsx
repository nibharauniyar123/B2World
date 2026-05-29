// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// const Expenses = () => {
//   const [expenses, setExpenses] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     amount: "",
//     category: "",
//   });

//   const fetchExpenses = async () => {
//     try {
//       const res = await axios.get("/expenses");
//       setExpenses(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("/expenses", {
//         ...form,
//         amount: Number(form.amount),
//       });

//       alert("Expense Added");

//       setForm({
//         title: "",
//         amount: "",
//         category: "",
//       });

//       fetchExpenses();
//     } catch (error) {
//       console.log(error);
//       alert("Expense create failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/expenses/${id}`);
//       fetchExpenses();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-4xl font-bold mb-8">Expenses Management</h1>

//       <form
//         onSubmit={handleCreate}
//         className="bg-white p-5 rounded-xl grid grid-cols-2 gap-4 mb-8"
//       >
//         <input
//           type="text"
//           placeholder="Expense Title"
//           className="border p-3 rounded"
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//           required
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           className="border p-3 rounded"
//           value={form.amount}
//           onChange={(e) =>
//             setForm({ ...form, amount: e.target.value })
//           }
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category"
//           className="border p-3 rounded"
//           value={form.category}
//           onChange={(e) =>
//             setForm({ ...form, category: e.target.value })
//           }
//         />

//         <button className="bg-blue-600 text-white py-3 rounded col-span-2">
//           Add Expense
//         </button>
//       </form>

//       <table className="w-full bg-white rounded-xl overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Title</th>
//             <th className="p-3">Amount</th>
//             <th className="p-3">Category</th>
//             <th className="p-3">Date</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {expenses.map((expense) => (
//             <tr key={expense.id} className="border-t">
//               <td className="p-3">{expense.title}</td>
//               <td className="p-3">Rs. {expense.amount}</td>
//               <td className="p-3">{expense.category}</td>

//               <td className="p-3">
//                 {new Date(expense.createdAt).toLocaleDateString()}
//               </td>

//               <td className="p-3">
//                 <button
//                   onClick={() => handleDelete(expense.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Expenses;

import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Expenses = () => {

  const [expenses, setExpenses] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      amount: "",
      category: "",
    });

  // =========================
  // FETCH EXPENSES
  // =========================

  const fetchExpenses =
    async () => {

      try {

        const res =
          await axios.get(
            "/expenses"
          );

        setExpenses(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // =========================
  // CREATE EXPENSE
  // =========================

  const handleCreate =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "/expenses",
          {
            ...form,
            amount: Number(
              form.amount
            ),
          }
        );

        alert(
          "Expense Added Successfully"
        );

        setForm({
          title: "",
          amount: "",
          category: "",
        });

        fetchExpenses();

      } catch (error) {

        console.log(error);

        alert(
          "Expense create failed"
        );
      }
    };

  // =========================
  // DELETE EXPENSE
  // =========================

  const handleDelete =
    async (id) => {

      try {

        await axios.delete(
          `/expenses/${id}`
        );

        fetchExpenses();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // TOTAL EXPENSE
  // =========================

  const totalExpense =
    expenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>

          <div>

            <h1 style={styles.heading}>
              Expenses Management
            </h1>

            <p style={styles.subText}>
              Manage all society expenses
            </p>

          </div>

          <div style={styles.totalCard}>

            <p style={styles.totalLabel}>
              Total Expense
            </p>

            <h2 style={styles.totalValue}>
              Rs. {totalExpense}
            </h2>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleCreate}
          style={styles.form}
        >

          <input
            type="text"
            placeholder="Expense Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
            style={styles.input}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount:
                  e.target.value,
              })
            }
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
            style={styles.input}
          />

          <button
            style={styles.addBtn}
          >
            Add Expense
          </button>

        </form>

        {/* TABLE */}

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <thead>

              <tr style={styles.tableHead}>

                <th style={styles.th}>
                  Title
                </th>

                <th style={styles.th}>
                  Amount
                </th>

                <th style={styles.th}>
                  Category
                </th>

                <th style={styles.th}>
                  Date
                </th>

                <th style={styles.th}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {expenses.map(
                (expense) => (

                  <tr
                    key={expense.id}
                    style={
                      styles.tableRow
                    }
                  >

                    <td style={styles.td}>
                      {expense.title}
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        color:
                          "#2563eb",
                        fontWeight:
                          "600",
                      }}
                    >
                      Rs.{" "}
                      {expense.amount}
                    </td>

                    <td style={styles.td}>
                      {
                        expense.category
                      }
                    </td>

                    <td style={styles.td}>
                      {expense.createdAt
                        ? new Date(
                            expense.createdAt
                          ).toLocaleDateString()
                        : "No Date"}
                    </td>

                    <td style={styles.td}>

                      <button
                        onClick={() =>
                          handleDelete(
                            expense.id
                          )
                        }
                        style={
                          styles.deleteBtn
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {expenses.length ===
            0 && (
            <p style={styles.noData}>
              No Expenses Found
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Expenses;

// =========================
// STYLES
// =========================

const styles = {

  page: {
    background: "#f3f6fb",
    minHeight: "100vh",
    padding: "30px",
  },

  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },

  heading: {
    fontSize: "52px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "8px",
  },

  subText: {
    color: "#6b7280",
    fontSize: "18px",
  },

  totalCard: {
    background: "#2563eb",
    color: "#fff",
    padding: "22px 28px",
    borderRadius: "18px",
    minWidth: "250px",
     boxShadow:
  "0 8px 20px rgba(37,99,235,0.25)",
  },

  totalLabel: {
    fontSize: "16px",
    opacity: 0.9,
    marginBottom: "8px",
  },

  totalValue: {
    fontSize: "34px",
    fontWeight: "700",
  },

  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "35px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.06)",
  },

  input: {
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    background: "#f9fafb",
  },

  addBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  tableWrapper: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.06)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  tableHead: {
    background: "#eef2ff",
  },

  th: {
    padding: "20px",
    textAlign: "left",
    fontSize: "18px",
    color: "#111827",
    fontWeight: "700",
  },

  td: {
    padding: "18px 20px",
    borderTop:
      "1px solid #e5e7eb",
    fontSize: "16px",
    color: "#374151",
  },

  tableRow: {
    transition: "0.3s",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },

  noData: {
    padding: "30px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "18px",
  },
};