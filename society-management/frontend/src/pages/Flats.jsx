// 
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

function Flats() {
  const [flats, setFlats] =
    useState([]);

const navigate = useNavigate();

  const [societies, setSocieties] =
    useState([]);
  const [societyFilter, setSocietyFilter] = useState("ALL");

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);
  const [statusFilter, setStatusFilter] =
useState("ALL");

  const totalFlats = flats.length;

const occupiedFlats = flats.filter(
  (flat) => flat.occupancyStatus === "OCCUPIED"
).length;

const vacantFlats = flats.filter(
  (flat) => flat.occupancyStatus === "VACANT"
).length;

const [search, setSearch] = useState("");

  const [form, setForm] =
    useState({
      block: "",
      flatNo: "",
      floor: "",
      ownerName: "",
      societyId: "",
    });

  // ======================
  // FETCH FLATS
  // ======================
  const fetchFlats =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/flats"
          );

        setFlats(
          res.data.flats ||
            res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ======================
  // FETCH SOCIETIES
  // ======================
  const fetchSocieties =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/societies"
          );

        setSocieties(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchFlats();
    fetchSocieties();
  }, []);

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // ======================
  // CREATE / UPDATE
  // ======================
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const payload = {
      ...form,
      societyId: Number(form.societyId), // ✅ FIX
    };

    if (editingId) {
      await axios.put(`/api/flats/${editingId}`, payload);
    } else {
      await axios.post("/api/flats", payload);
    }

    resetForm();
    fetchFlats();

  } catch (error) {
    console.log("ERROR:", error.response?.data); // 🔥 IMPORTANT
    alert(error.response?.data?.error || "Save failed");
  } finally {
    setLoading(false);
  }
};
const changeStatus = async (flat) => {

  const newStatus =
    flat.occupancyStatus === "VACANT"
      ? "OCCUPIED"
      : "VACANT";

  await axios.put(
    `http://localhost:5000/api/flats/${flat.id}/status`,
    {
      occupancyStatus: newStatus,
    }
  );

  fetchFlats();
};

  // ======================
  // DELETE
  // ======================
  // const handleDelete =
  //   async (id) => {
  //     const ok =
  //       window.confirm(
  //         "Delete Flat?"
  //       );

  //     if (!ok) return;

  //     try {
  //       await axios.delete(
  //         `/api/flats/${id}`
  //       );

  //       fetchFlats();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const confirmDelete = (id) => {

  const confirmBox = window.confirm(
    "Are you sure you want to delete this flat?"
  );

  if (confirmBox) {
    handleDelete(id);
  }

};

const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this flat?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `http://localhost:5000/api/flats/${id}`
    );

    toast.success("Flat deleted successfully");

    fetchFlats();

  } catch (error) {

    alert("Delete failed");

    console.log(error);

  }

};
  // ======================
  // EDIT
  // ======================
  const handleEdit = (
    flat
  ) => {
    setEditingId(
      flat.id
    );

    setForm({
      block:
        flat.block,
      flatNo:
        flat.flatNo,
      floor:
        flat.floor,
      ownerName:
        flat.ownerName,
      societyId:
        flat.societyId,
    });

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  };

  // ======================
  // RESET
  // ======================
  const resetForm =
    () => {
      setEditingId(
        null
      );

      setForm({
        block: "",
        flatNo: "",
        floor: "",
        ownerName: "",
        societyId: "",
      });
    };

  return (
    <>
    <div
      style={
        styles.page
      }
    >
      {/* HEADER */}
      <h1
        style={
          styles.title
        }
      >
        Flats
        Management
      </h1>

      <div style={styles.cardContainer}>
  <div style={styles.card}>
    <h3>Total Flats</h3>
    <h1>{totalFlats}</h1>
  </div>

  <div style={styles.card}>
    <h3>Occupied Flats</h3>
    <h1>{occupiedFlats}</h1>
  </div>

  <div style={styles.card}>
    <h3>Vacant Flats</h3>
    <h1>{vacantFlats}</h1>
  </div>
</div>
<div style={styles.filterContainer}>
<input
  type="text"
  placeholder="Search Flat..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={styles.input}
/>
<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="ALL">All Status</option>
  <option value="VACANT">Vacant</option>
  <option value="OCCUPIED">Occupied</option>
</select>

<select
  value={societyFilter}
  onChange={(e) => setSocietyFilter(e.target.value)}
>
  <option value="ALL">All Society</option>

  {societies.map((society) => (
    <option key={society.id} value={society.id}>
      {society.name}
    </option>
  ))}
</select>
</div>


      {/* FORM */}
      <form
        onSubmit={
          handleSubmit
        }
        style={
          styles.form
        }
      >
        <input
          name="block"
          placeholder="Block"
          value={
            form.block
          }
          onChange={
            handleChange
          }
          required
          style={
            styles.input
          }
        />

        <input
          name="flatNo"
          placeholder="Flat No"
          value={
            form.flatNo
          }
          onChange={
            handleChange
          }
          required
          style={
            styles.input
          }
        />

        <input
          name="floor"
          placeholder="Floor"
          value={
            form.floor
          }
          onChange={
            handleChange
          }
          required
          style={
            styles.input
          }
        />

        <input
          name="ownerName"
          placeholder="Owner Name"
          value={
            form.ownerName
          }
          onChange={
            handleChange
          }
          required
          style={
            styles.input
          }
        />

        <select
          name="societyId"
          value={
            form.societyId
          }
          onChange={
            handleChange
          }
          required
          style={
            styles.input
          }
        >
          <option value="">
            Select
            Society
          </option>

          {societies.map(
            (
              s
            ) => (
              <option
                key={
                  s.id
                }
                value={
                  s.id
                }
              >
                {s.name}
              </option>
            )
        )}
        </select>

        <button
          type="submit"
          style={
            styles.btn
          }
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Flat"
            : "Add Flat"}
        </button>
      </form>

      {/* TABLE */}
      <div
        style={
          styles.tableWrap
        }
      >
        <table
          style={
            styles.table
          }
        >
          <thead>
            <tr
              style={
                styles.head
              }
            >
              <th style={styles.th}>
                Block
              </th>
              <th style={styles.th} >
                Flat
              </th>
              <th style={styles.th}>
                Floor
              </th>
              <th style={styles.th}>
                Owner
              </th>
               <th style={styles.th}>Status</th>
              <th style={styles.th}>
                Society
              </th>
              <th style={styles.th}>
                Action
              </th>
             
            </tr>
          </thead>

          {/* <tbody>
            {flats.length >
            0 ? ( 
               flats.map( 
              flats
.filter((flat) => {
  return (
    flat.flatNo.toLowerCase().includes(search.toLowerCase()) ||
    flat.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    flat.block.toLowerCase().includes(search.toLowerCase())
  );
})
.map((flat) => (
                (
                  flat
                ) => (
                  <tr
                    key={
                      flat.id
                    }
                  >
                    <td>
                      {
                        flat.block
                      }
                    </td>

                    <td>
                      {
                        flat.flatNo
                      }
                    </td>

                    <td>
                      {
                        flat.floor
                      }
                    </td>

                    <td>
                      {
                        flat.ownerName
                      }
                    </td>

                    <td>
                      {flat
                        .society
                        ?.name ||
                        "-"}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          handleEdit(
                            flat
                          )
                        }
                        style={
                          styles.editBtn
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            flat.id
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
              )
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    padding:
                      "20px",
                    textAlign:
                      "center",
                  }}
                >
                  No flats
                  found
                </td>
              </tr>
            )}
          </tbody> */}
          <tbody>
  {/* {flats.length > 0 ? (
    flats
      .filter((flat) => {
        return (
          flat.flatNo.toLowerCase().includes(search.toLowerCase()) ||
          flat.ownerName.toLowerCase().includes(search.toLowerCase()) ||
          flat.block.toLowerCase().includes(search.toLowerCase())
        );
      }) */}
        {flats.length > 0 ? (

    flats
      .filter((flat) => {

        const searchMatch =
          flat.flatNo.toLowerCase().includes(search.toLowerCase()) ||
          flat.ownerName.toLowerCase().includes(search.toLowerCase()) ||
          flat.block.toLowerCase().includes(search.toLowerCase());

        const statusMatch =
          statusFilter === "ALL" ||
          flat.occupancyStatus === statusFilter;

        const societyMatch =
  societyFilter === "ALL" ||
  flat.societyId === Number(societyFilter);

        return searchMatch && statusMatch && societyMatch;

      })
      .map((flat) => (
        <tr key={flat.id}>
          <td style={styles.td}>{flat.block}</td>

          <td style={styles.td}>{flat.flatNo}</td>

          <td style={styles.td}>{flat.floor}</td>

          <td style={styles.td}>{flat.ownerName}</td>
          <td>
  <span
    style={{
      background:
        flat.occupancyStatus === "VACANT"
          ? "#22c55e"
          : "#ef4444",

      color: "#fff",

      padding: "6px 14px",

      borderRadius: "20px",

      fontSize: "13px",

      fontWeight: "600",
    }}
  >
    {flat.occupancyStatus}
  </span>
           {/* <button style={{
  padding: "4px 10px",
  fontSize: "12px",
  borderRadius: "15px",
  marginLeft: "8px",
  cursor: "pointer",
  color: "#fff",
  border: "none",
  
}}
>
  {flat.occupancyStatus === "VACANT"
    ? "Occupy"
    : "Vacate"}
</button> */}

<button
  onClick={() => changeStatus(flat)}
  style={{
    padding: "6px 14px",
    borderRadius: "20px",
    border: "none",
    background:
      flat.occupancyStatus === "VACANT"
        ? "#2563eb"
        : "#f59e0b",
    color: "#fff",
    cursor: "pointer",
  }}
>
  {flat.occupancyStatus === "VACANT"
    ? "Occupy"
    : "Vacate"}
</button>
</td>

          <td style={styles.td}>{flat.society?.name || "-"}</td>

          {/* <td style={styles.td}>{flat.occupancyStatus}</td> */}

          <td style={styles.actionBox}>
            <button
  onClick={() =>
    navigate(`/assign-resident/${flat.id}`)
  }
>
  Assign
</button>
   
            <button
              onClick={() => handleEdit(flat)}  
              style={styles.editBtn}
            >
              Edit
            </button>
            <Link to={`/flats/${flat.id}`}>
  <button style={styles.viewBtn}>View</button>
</Link>

            {/* <button
              // onClick={() => handleDelete(flat.id)}
              onClick={() => {
  if (window.confirm("Are you sure you want to delete this flat?")) {
   confirmDelete(flat.id);
  }
}}
              style={styles.deleteBtn}
            >
              Delete
            </button> */}
            <button
  onClick={() => confirmDelete(flat.id)}
  style={styles.deleteBtn}
>
  Delete
</button>

          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td
        colSpan="6"
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        No flats found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </div>
   
   <ToastContainer />
   </>
  );
}

export default Flats;

// ====================
// CSS
// ====================
const styles = {
  page: {
    padding:
      "30px",
    background:
      "#f4f7fb",
    minHeight:
      "100vh",
  },

  title: {
    fontSize:
      "40px",
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
    marginBottom:
      "30px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.05)",
  },

  input: {
    padding:
      "14px",
    border:
      "1px solid #d1d5db",
    borderRadius:
      "12px",
    fontSize:
      "15px",
  },

  btn: {
    background:
      "#2563eb",
    color:
      "#fff",
    border:
      "none",
    borderRadius:
      "12px",
    padding:
      "14px",
    fontWeight:
      "700",
    cursor:
      "pointer",
  },

  tableWrap: {
    background:
      "#fff",
    borderRadius:
      "18px",
    overflow:
      "hidden",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.05)",
  },

  // table: {
  //   width: "100%",
  //   borderCollapse:
  //     "collapse",
  // },
//   table: {
//   width: "100%",
//   borderCollapse: "collapse",
//   background: "#fff",
//   borderRadius: "12px",
//   overflow: "hidden",
//   tableLayout: "fixed",
// },
table: {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
},
th: {
  padding: "16px",
  background: "#eef3ff",
  textAlign: "center",
  fontWeight: "200",
  borderBottom: "1px solid #ddd",
},
td: {
  padding: "15px",
  textAlign: "center",
  borderBottom: "1px solid #eee",
},
actionBox: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
},

  head: {
    background:
      "#eef2ff",
  },

  editBtn: {
    background:
      "#16a34a",
    color:
      "#fff",
    border:
      "none",
    padding:
      "8px 14px",
    marginRight:
      "8px",
    borderRadius:
      "10px",
    cursor:
      "pointer",
  },

  deleteBtn: {
    background:
      "#ef4444",
    color:
      "#fff",
    border:
      "none",
    padding:
      "8px 14px",
    borderRadius:
      "10px",
    cursor:
      "pointer",
  },
  viewBtn: {
    background:
      "#3b82f6",
    color:
      "#fff",
    border:
      "none",
    padding:
      "8px 14px",
    borderRadius:
      "10px",
    cursor:
      "pointer",
  },
  
  cardContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "30px",
},

card: {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 10px 20px rgba(0,0,0,.05)",
  textAlign: "center",
},
};