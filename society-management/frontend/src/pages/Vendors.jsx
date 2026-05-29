
import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    service: "",
    phone: "",
    address: "",
  });

  const fetchVendors = async () => {
    try {
      const res = await axios.get("/vendors");
      setVendors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/vendors", form);

      alert("Vendor Added Successfully");

      setForm({
        name: "",
        service: "",
        phone: "",
        address: "",
      });

      fetchVendors();
    } catch (error) {
      console.log(error);
      alert("Failed to add vendor");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vendors/${id}`);

      fetchVendors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Vendors Management
        </h1>

        <form
          onSubmit={handleCreate}
          style={styles.form}
        >
          <input
            type="text"
            placeholder="Vendor Name"
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
            type="text"
            placeholder="Service"
            value={form.service}
            onChange={(e) =>
              setForm({
                ...form,
                service: e.target.value,
              })
            }
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            style={styles.input}
          />

          <button style={styles.addBtn}>
            Add Vendor
          </button>
        </form>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  style={styles.tableRow}
                >
                  <td style={styles.td}>
                    {vendor.name}
                  </td>

                  <td style={styles.td}>
                    {vendor.service}
                  </td>

                  <td style={styles.td}>
                    {vendor.phone}
                  </td>

                  <td style={styles.td}>
                    {vendor.address}
                  </td>

                  <td style={styles.td}>
                    <button
                      onClick={() =>
                        handleDelete(vendor.id)
                      }
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {vendors.length === 0 && (
            <p style={styles.noData}>
              No Vendors Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendors;

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

  heading: {
    fontSize: "52px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#111827",
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
    gridColumn: "span 2",
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
  },

  td: {
    padding: "18px 20px",
    borderTop: "1px solid #e5e7eb",
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
  },

  noData: {
    padding: "30px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "18px",
  },
};