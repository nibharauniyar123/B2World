import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Layout from "../components/Layout";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  // FETCH
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotifications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/notifications", form);

      setForm({
        title: "",
        message: "",
      });

      fetchNotifications();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notifications/${id}`);

      fetchNotifications();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Notifications
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            style={styles.input}
            required
          />

          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            style={styles.textarea}
            required
          />

          <button style={styles.button}>
            Add Notification
          </button>
        </form>

        {/* LIST */}
        <div style={styles.list}>
          {notifications.map((item) => (
            <div
              key={item.id}
              style={styles.card}
            >
              <div>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  handleDelete(item.id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Notifications;

// ===================
// STYLES
// ===================

const styles = {
  container: {
    padding: "20px",
  },

  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    minHeight: "100px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  list: {
    display: "grid",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};