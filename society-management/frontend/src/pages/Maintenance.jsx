import {
  useEffect,
  useState,
} from "react";

import axios from "../utils/axios";

function Maintenance() {
  const [data, setData] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [form, setForm] =
    useState({
      amount: "",
      month: "",
      userId: "",
    });

  const [loading, setLoading] =
    useState(false);

  const fetchData =
    async () => {
      const res =
        await axios.get(
          "/maintenance"
        );

      const userRes =
        await axios.get(
          "/users"
        );

      setData(
        res.data
      );

      setUsers(
        userRes.data.users ||
          userRes.data
      );
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await axios.post(
          "/maintenance",
          form
        );

        setForm({
          amount: "",
          month: "",
          userId: "",
        });

        fetchData();
      } catch {
        alert(
          "Create Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      await axios.delete(
        `/maintenance/${id}`
      );

      fetchData();
    };

  const updateStatus =
    async (
      id,
      status
    ) => {
      await axios.put(
        `/maintenance/${id}`,
        { status }
      );

      fetchData();
    };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        Maintenance
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
          placeholder="Amount"
          value={
            form.amount
          }
          onChange={(e) =>
            setForm({
              ...form,
              amount:
                e.target
                  .value,
            })
          }
          style={styles.input}
          required
        />

        <input
          placeholder="Month"
          value={
            form.month
          }
          onChange={(e) =>
            setForm({
              ...form,
              month:
                e.target
                  .value,
            })
          }
          style={styles.input}
          required
        />

        <select
          value={
            form.userId
          }
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
            (
              user
            ) => (
              <option
                key={
                  user.id
                }
                value={
                  user.id
                }
              >
                {
                  user.name
                }
              </option>
            )
          )}
        </select>

        <button
          style={
            styles.button
          }
        >
          {loading
            ? "Adding..."
            : "Add Bill"}
        </button>
      </form>

      {/* TABLE */}
      <div
        style={
          styles.card
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
                Amount
              </th>
              <th
                style={
                  styles.th
                }
              >
                Month
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
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
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
                    Rs{" "}
                    {
                      item.amount
                    }
                  </td>

                  <td
                    style={
                      styles.td
                    }
                  >
                    {
                      item.month
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
                        styles.input
                      }
                    >
                      <option>
                        PENDING
                      </option>
                      <option>
                        PAID
                      </option>
                    </select>
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
                        styles.delete
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

export default Maintenance;

// CSS
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
    cursor:
      "pointer",
    fontWeight:
      "600",
  },

  card: {
    background:
      "#fff",
    borderRadius:
      "18px",
    overflow:
      "hidden",
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

  delete: {
    background:
      "#ef4444",
    color:
      "#fff",
    border:
      "none",
    padding:
      "10px 14px",
    borderRadius:
      "10px",
    cursor:
      "pointer",
  },
};