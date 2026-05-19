import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Users() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");


  // ===============================
  // FILTER USERS
  // ===============================
  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ===============================
  // FETCH USERS
  // ===============================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.users || res.data);
    } catch (error) {
      console.log("Fetch Users Error:", error);
    }
  };

  // ===============================
  // PAGE LOAD
  // ===============================
  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // CREATE USER
  // ===============================

const handleCreate = async () => {
  try {

    await axios.post("/users", {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    alert("User created");

    fetchUsers();

  } catch (error) {

    console.log(error.response?.data);

    alert("Create failed");
  }
};
  // ===============================
  // DELETE USER
  // ===============================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "25px",
          color: "#1e293b",
        }}
      >
        Users Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleCreate}
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "14px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
          style={inputStyle}
        />

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        
        {/* ROLE */}
        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          style={inputStyle}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {/* TABLE */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f1f5f9",
                textAlign: "left",
              }}
            >
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  style={{
                    borderTop: "1px solid #e2e8f0",
                    background:
                      index % 2 === 0 ? "#ffffff" : "#f8fafc",
                  }}
                >
                  <td style={tdStyle}>{user.name}</td>

                  <td style={tdStyle}>{user.email}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background:
                          user.role === "ADMIN"
                            ? "#dcfce7"
                            : "#dbeafe",
                        color:
                          user.role === "ADMIN"
                            ? "#166534"
                            : "#1d4ed8",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===============================
// STYLES
// ===============================
const inputStyle = {
  padding: "14px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  fontSize: "15px",
  outline: "none",
};

const thStyle = {
  padding: "16px",
  fontSize: "15px",
  color: "#334155",
};

const tdStyle = {
  padding: "16px",
  color: "#1e293b",
};

export default Users;