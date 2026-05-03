// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// function Complaints() {
//   const [complaints, setComplaints] =
//     useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     userId: "",
//     societyId: "",
//   });

//   const fetchComplaints =
//     async () => {
//       const res =
//         await axios.get(
//           "/complaints"
//         );

//       setComplaints(
//         res.data
//       );
//     };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleCreate =
//     async (e) => {
//       e.preventDefault();

//       await axios.post(
//         "/complaints",
//         form
//       );

//       setForm({
//         title: "",
//         description: "",
//         userId: "",
//         societyId: "",
//       });

//       fetchComplaints();
//     };

//   const handleDelete =
//     async (id) => {
//       await axios.delete(
//         `/complaints/${id}`
//       );

//       fetchComplaints();
//     };

//   const handleStatus =
//     async (id, status) => {
//       await axios.put(
//         `/complaints/${id}`,
//         { status }
//       );

//       fetchComplaints();
//     };

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.title}>
//         Complaints
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
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               title:
//                 e.target
//                   .value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         <input
//           placeholder="Description"
//           value={
//             form.description
//           }
//           onChange={(e) =>
//             setForm({
//               ...form,
//               description:
//                 e.target
//                   .value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         <input
//           placeholder="User ID"
//           value={form.userId}
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
//         />

//         <input
//           placeholder="Society ID"
//           value={
//             form.societyId
//           }
//           onChange={(e) =>
//             setForm({
//               ...form,
//               societyId:
//                 e.target
//                   .value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         <button
//           style={
//             styles.createBtn
//           }
//         >
//           Add Complaint
//         </button>
//       </form>

//       {/* TABLE */}
//       <div
//         style={
//           styles.tableCard
//         }
//       >
//         <table
//           style={
//             styles.table
//           }
//         >
//           <thead>
//             <tr
//               style={
//                 styles.head
//               }
//             >
//               <th
//                 style={
//                   styles.th
//                 }
//               >
//                 Title
//               </th>
//               <th
//                 style={
//                   styles.th
//                 }
//               >
//                 Description
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
//                 Date
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
//             {complaints.map(
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
//                     {
//                       item.title
//                     }
//                   </td>

//                   <td
//                     style={
//                       styles.td
//                     }
//                   >
//                     {
//                       item.description
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
//                         handleStatus(
//                           item.id,
//                           e
//                             .target
//                             .value
//                         )
//                       }
//                       style={
//                         styles.select
//                       }
//                     >
//                       <option>
//                         OPEN
//                       </option>
//                       <option>
//                         IN_PROGRESS
//                       </option>
//                       <option>
//                         RESOLVED
//                       </option>
//                     </select>
//                   </td>

//                   <td
//                     style={
//                       styles.td
//                     }
//                   >
//                     {new Date(
//                       item.createdAt
//                     ).toLocaleDateString()}
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
//                         styles.deleteBtn
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

// export default Complaints;

// // INLINE CSS
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
//       "repeat(auto-fit,minmax(200px,1fr))",
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

//   createBtn: {
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

//   tableCard: {
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

//   head: {
//     background:
//       "#eef2f7",
//   },

//   th: {
//     padding:
//       "15px",
//     textAlign:
//       "left",
//   },

//   td: {
//     padding:
//       "15px",
//     borderTop:
//       "1px solid #eee",
//   },

//   select: {
//     padding:
//       "8px",
//     borderRadius:
//       "8px",
//   },

//   deleteBtn: {
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

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: "",
    societyId: "",
  });

  // =========================
  // FETCH ALL DATA
  // =========================
  const fetchData = async () => {
    try {
      const complaintRes =
        await axios.get(
          "/complaints"
        );

      const userRes =
        await axios.get(
          "/users"
        );

      const societyRes =
        await axios.get(
          "/societies"
        );

      setComplaints(
        complaintRes.data
      );

      setUsers(
        userRes.data.users ||
          userRes.data
      );

      setSocieties(
        societyRes.data
          .societies ||
          societyRes.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreate =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await axios.post(
          "/complaints",
          form
        );

        setForm({
          title: "",
          description:
            "",
          userId: "",
          societyId:
            "",
        });

        fetchData();
      } catch (error) {
        alert(
          "Complaint create failed"
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // DELETE
  // =========================
  const handleDelete =
    async (id) => {
      try {
        await axios.delete(
          `/complaints/${id}`
        );

        fetchData();
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // STATUS UPDATE
  // =========================
  const updateStatus =
    async (
      id,
      status
    ) => {
      try {
        await axios.put(
          `/complaints/${id}`,
          { status }
        );

        fetchData();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        Complaints
        Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={
          handleCreate
        }
        style={styles.form}
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target
                  .value,
            })
          }
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target
                  .value,
            })
          }
          style={styles.input}
          required
        />

        {/* USER DROPDOWN */}
        <select
          value={form.userId}
          onChange={(e) =>
            setForm({
              ...form,
              userId:
                e.target
                  .value,
            })
          }
          style={styles.input}
          required
        >
          <option value="">
            Select User
          </option>

          {users.map(
            (user) => (
              <option
                key={
                  user.id
                }
                value={
                  user.id
                }
              >
                {user.name}
              </option>
            )
          )}
        </select>

        {/* SOCIETY DROPDOWN */}
        <select
          value={
            form.societyId
          }
          onChange={(e) =>
            setForm({
              ...form,
              societyId:
                e.target
                  .value,
            })
          }
          style={styles.input}
          required
        >
          <option value="">
            Select
            Society
          </option>

          {societies.map(
            (
              society
            ) => (
              <option
                key={
                  society.id
                }
                value={
                  society.id
                }
              >
                {
                  society.name
                }
              </option>
            )
          )}
        </select>

        <button
          type="submit"
          style={
            styles.button
          }
        >
          {loading
            ? "Adding..."
            : "Add Complaint"}
        </button>
      </form>

      {/* TABLE */}
      <div
        style={
          styles.tableCard
        }
      >
        <table
          style={
            styles.table
          }
        >
          <thead>
            <tr>
              <th
                style={
                  styles.th
                }
              >
                Title
              </th>

              <th
                style={
                  styles.th
                }
              >
                Description
              </th>

              <th
                style={
                  styles.th
                }
              >
                Status
              </th>

              <th
                style={
                  styles.th
                }
              >
                Date
              </th>

              <th
                style={
                  styles.th
                }
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {complaints.map(
              (
                item
              ) => (
                <tr
                  key={
                    item.id
                  }
                >
                  <td
                    style={
                      styles.td
                    }
                  >
                    {
                      item.title
                    }
                  </td>

                  <td
                    style={
                      styles.td
                    }
                  >
                    {
                      item.description
                    }
                  </td>

                  <td
                    style={
                      styles.td
                    }
                  >
                    <select
                      value={
                        item.status
                      }
                      onChange={(
                        e
                      ) =>
                        updateStatus(
                          item.id,
                          e
                            .target
                            .value
                        )
                      }
                      style={
                        styles.status
                      }
                    >
                      <option>
                        OPEN
                      </option>
                      <option>
                        IN_PROGRESS
                      </option>
                      <option>
                        RESOLVED
                      </option>
                    </select>
                  </td>

                  <td
                    style={
                      styles.td
                    }
                  >
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td
                    style={
                      styles.td
                    }
                  >
                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
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
      </div>
    </div>
  );
}

export default Complaints;

// =========================
// CSS
// =========================
const styles = {
  page: {
    padding: "30px",
    background:
      "#f4f7fb",
    minHeight:
      "100vh",
  },

  title: {
    fontSize:
      "38px",
    fontWeight:
      "700",
    marginBottom:
      "25px",
  },

  form: {
    display:
      "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    background:
      "#fff",
    padding:
      "25px",
    borderRadius:
      "18px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.05)",
    marginBottom:
      "30px",
  },

  input: {
    padding:
      "14px",
    border:
      "1px solid #ddd",
    borderRadius:
      "12px",
    fontSize:
      "15px",
  },

  button: {
    background:
      "#2563eb",
    color:
      "#fff",
    border:
      "none",
    borderRadius:
      "12px",
    fontWeight:
      "600",
    cursor:
      "pointer",
  },

  tableCard: {
    background:
      "#fff",
    borderRadius:
      "18px",
    overflow:
      "hidden",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
  },

  th: {
    background:
      "#eef2f7",
    padding:
      "16px",
    textAlign:
      "left",
  },

  td: {
    padding:
      "16px",
    borderTop:
      "1px solid #eee",
  },

  status: {
    padding:
      "8px",
    borderRadius:
      "10px",
  },

  deleteBtn: {
    background:
      "#ef4444",
    color:
      "#fff",
    border:
      "none",
    padding:
      "10px 15px",
    borderRadius:
      "10px",
    cursor:
      "pointer",
  },
};