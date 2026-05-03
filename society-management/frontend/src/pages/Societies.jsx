// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// function Societies() {
//   const [societies, setSocieties] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     city: "",
//   });

//   const [loading, setLoading] = useState(false);
//   // GET ALL
//   // ======================
//   const fetchSocieties = async () => {
//     try {
//       const res = await axios.get("/societies");
//       setSocieties(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchSocieties();
//   }, []);

//   // ======================
//   // CREATE
//   // ======================
//   const handleCreate = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await axios.post("/societies", form);

//       setForm({
//         name: "",
//         address: "",
//         city: "",
//       });

//       fetchSocieties();
//     } catch (error) {
//       console.log(error);
//       alert("Create failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ======================
//   // DELETE
//   // ======================
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/societies/${id}`);
//       fetchSocieties();
//     } catch (error) {
//       console.log(error);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "30px",
//         background: "#f4f6fb",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Title */}
//       <h1
//         style={{
//           fontSize: "42px",
//           fontWeight: "700",
//           marginBottom: "30px",
//           color: "#1e2a44",
//         }}
//       >
//         Society Management
//       </h1>

//       {/* FORM CARD */}
//       <form
//         onSubmit={handleCreate}
//         style={{
//           background: "#fff",
//           padding: "30px",
//           borderRadius: "18px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
//           marginBottom: "30px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
//           gap: "18px",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Society Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           required
//           style={inputStyle}
//         />

//         <input
//           type="text"
//           placeholder="Address"
//           value={form.address}
//           onChange={(e) =>
//             setForm({ ...form, address: e.target.value })
//           }
//           required
//           style={inputStyle}
//         />

//         <input
//           type="text"
//           placeholder="City"
//           value={form.city}
//           onChange={(e) =>
//             setForm({ ...form, city: e.target.value })
//           }
//           required
//           style={inputStyle}
//         />

//         <button
//           type="submit"
//           style={buttonStyle}
//         >
//           {loading ? "Creating..." : "Create Society"}
//         </button>
//       </form>

//       {/* TABLE CARD */}
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "18px",
//           overflow: "hidden",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
//         }}
//       >
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//           }}
//         >
//           <thead>
//             <tr
//               style={{
//                 background: "#eef2f7",
//                 textAlign: "left",
//               }}
//             >
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Address</th>
//               <th style={thStyle}>City</th>
//               <th style={thStyle}>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {societies.length > 0 ? (
//               societies.map((item) => (
//                 <tr
//                   key={item.id}
//                   style={{
//                     borderTop: "1px solid #eee",
//                   }}
//                 >
//                   <td style={tdStyle}>{item.name}</td>
//                   <td style={tdStyle}>{item.address}</td>
//                   <td style={tdStyle}>{item.city}</td>

//                   <td style={tdStyle}>
//                     <button
//                       onClick={() =>
//                         handleDelete(item.id)
//                       }
//                       style={deleteBtn}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="4"
//                   style={{
//                     padding: "25px",
//                     textAlign: "center",
//                     color: "#777",
//                   }}
//                 >
//                   No societies found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Societies;

// // ======================
// // STYLES
// // ======================

// const inputStyle = {
//   padding: "14px",
//   borderRadius: "12px",
//   border: "1px solid #d0d7e2",
//   fontSize: "16px",
//   outline: "none",
// };

// const buttonStyle = {
//   background: "#2563eb",
//   color: "#fff",
//   border: "none",
//   borderRadius: "12px",
//   padding: "14px",
//   fontSize: "16px",
//   fontWeight: "600",
//   cursor: "pointer",
// };

// const deleteBtn = {
//   background: "#ef4444",
//   color: "#fff",
//   border: "none",
//   padding: "10px 18px",
//   borderRadius: "10px",
//   cursor: "pointer",
//   fontWeight: "600",
// };

// const thStyle = {
//   padding: "18px",
//   fontSize: "16px",
//   color: "#1e293b",
// };

// const tdStyle = {
//   padding: "18px",
// };

import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Societies() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
  });

  const [editId, setEditId] = useState(null);

  // =========================
  // GET DATA
  // =========================
  const fetchSocieties = async () => {
    try {
      const res = await axios.get("/societies");
      setSocieties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/societies", form);

      setForm({
        name: "",
        address: "",
        city: "",
      });

      fetchSocieties();
    } catch (error) {
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/societies/${id}`);
      fetchSocieties();
    } catch (error) {
      alert("Delete failed");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item) => {
    setEditId(item.id);

    setForm({
      name: item.name,
      address: item.address,
      city: item.city,
    });
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(`/societies/${editId}`, form);

      setEditId(null);

      setForm({
        name: "",
        address: "",
        city: "",
      });

      fetchSocieties();
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CANCEL
  // =========================
  const cancelEdit = () => {
    setEditId(null);

    setForm({
      name: "",
      address: "",
      city: "",
    });
  };

  return (
    <div style={styles.page}>
      {/* TITLE */}
      <h1 style={styles.title}>Society Management</h1>

      {/* FORM */}
      <form
        onSubmit={editId ? handleUpdate : handleCreate}
        style={styles.formCard}
      >
        <input
          type="text"
          placeholder="Society Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          style={styles.input}
          required
        />

        <div style={styles.btnGroup}>
          <button
            type="submit"
            style={
              editId
                ? styles.updateBtn
                : styles.createBtn
            }
          >
            {loading
              ? "Please wait..."
              : editId
              ? "Update"
              : "Create"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={cancelEdit}
              style={styles.cancelBtn}
            >
              X
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {societies.length > 0 ? (
              societies.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.address}</td>
                  <td style={styles.td}>{item.city}</td>

                  <td style={styles.td}>
                    <div style={styles.actionBox}>
                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        style={styles.editBtn}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={styles.noData}
                >
                  No societies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Societies;

// ===========================
// INLINE CSS
// ===========================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "30px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "25px",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  input: {
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
  },

  btnGroup: {
    display: "flex",
    gap: "10px",
  },

  createBtn: {
    flex: 1,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  updateBtn: {
    flex: 1,
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  cancelBtn: {
    width: "55px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  headRow: {
    background: "#eef2f7",
  },

  th: {
    padding: "18px",
    textAlign: "left",
    fontSize: "16px",
    color: "#1e293b",
  },

  tr: {
    borderTop: "1px solid #eee",
  },

  td: {
    padding: "18px",
  },

  actionBox: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  noData: {
    padding: "25px",
    textAlign: "center",
    color: "#777",
  },
};