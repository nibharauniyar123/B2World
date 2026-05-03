// 
import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Flats() {
  const [flats, setFlats] =
    useState([]);

  const [societies, setSocieties] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

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
            "/flats"
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
            "/societies"
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
      await axios.put(`/flats/${editingId}`, payload);
    } else {
      await axios.post("/flats", payload);
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

  // ======================
  // DELETE
  // ======================
  const handleDelete =
    async (id) => {
      const ok =
        window.confirm(
          "Delete Flat?"
        );

      if (!ok) return;

      try {
        await axios.delete(
          `/flats/${id}`
        );

        fetchFlats();
      } catch (error) {
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
              <th>
                Block
              </th>
              <th>
                Flat
              </th>
              <th>
                Floor
              </th>
              <th>
                Owner
              </th>
              <th>
                Society
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {flats.length >
            0 ? (
              flats.map(
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
          </tbody>
        </table>
      </div>
    </div>
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

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
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
};