import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Visitors() {
  const [visitors, setVisitors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    residentId: "",
  });

  const fetchVisitors = async () => {
    const res = await axios.get(
      "/visitors"
    );
    setVisitors(res.data);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await axios.post(
      "/visitors",
      form
    );

    setForm({
      name: "",
      phone: "",
      vehicle: "",
      residentId: "",
    });

    fetchVisitors();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `/visitors/${id}`
    );

    fetchVisitors();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        Visitors Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleCreate}
        style={styles.form}
      >
        <input
          placeholder="Visitor Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={styles.input}
          required
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          style={styles.input}
          required
        />

        <input
          placeholder="Vehicle No"
          value={form.vehicle}
          onChange={(e) =>
            setForm({
              ...form,
              vehicle:
                e.target.value,
            })
          }
          style={styles.input}
          required
        />

        <input
          placeholder="Resident ID"
          value={form.residentId}
          onChange={(e) =>
            setForm({
              ...form,
              residentId:
                e.target.value,
            })
          }
          style={styles.input}
          required
        />

        <button style={styles.createBtn}>
          Add Visitor
        </button>
      </form>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.head}>
              <th style={styles.th}>
                Name
              </th>
              <th style={styles.th}>
                Phone
              </th>
              <th style={styles.th}>
                Vehicle
              </th>
              <th style={styles.th}>
                Resident ID
              </th>
              <th style={styles.th}>
                Check In
              </th>
              <th style={styles.th}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>
                  {item.name}
                </td>
                <td style={styles.td}>
                  {item.phone}
                </td>
                <td style={styles.td}>
                  {item.vehicle}
                </td>
                <td style={styles.td}>
                  {item.residentId}
                </td>
                <td style={styles.td}>
                  {new Date(
                    item.checkIn
                  ).toLocaleString()}
                </td>

                <td style={styles.td}>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Visitors;

// INLINE CSS
const styles = {
  page: {
    padding: "30px",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  title: {
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "25px",
  },

  form: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "15px",
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "30px",
  },

  input: {
    padding: "14px",
    border: "1px solid #ddd",
    borderRadius: "12px",
  },

  createBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  head: {
    background: "#eef2f7",
  },

  th: {
    padding: "15px",
    textAlign: "left",
  },

  td: {
    padding: "15px",
    borderTop: "1px solid #eee",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};