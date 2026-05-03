

// import { useEffect, useState } from "react";
// import axios from "../utils/axios";
// import "../styles/Users.css";

// function Users() {
//   const [users, setUsers] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "USER",
//   });

//   const [loading, setLoading] = useState(false);

//   // ===============================
//   // GET USERS
//   // ===============================
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("/users");
//       setUsers(res.data.users || res.data);
//     } catch (error) {
//       console.log("Fetch Users Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ===============================
//   // CREATE USER
//   // ===============================
//   const handleCreate = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await axios.post("/users", form);

//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         role: "USER",
//       });

//       fetchUsers();
//     } catch (error) {
//       console.log("Create User Error:", error);
//       alert("User create failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // DELETE USER
//   // ===============================
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/users/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.log("Delete Error:", error);
//     }
//   };

//   return (
//     <div className="p-6">

//       {/* Title */}
//       <h1 className="text-3xl font-bold mb-6">Users Management</h1>

//       {/* Form */}
//       <form
//         onSubmit={handleCreate}
//         className="bg-white shadow rounded-xl p-5 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4"
//       >
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-3 rounded-lg"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//           required
//         />

//         <select
//           className="border p-3 rounded-lg"
//           value={form.role}
//           onChange={(e) =>
//             setForm({ ...form, role: e.target.value })
//           }
//         >
//           <option value="USER">USER</option>
//           <option value="ADMIN">ADMIN</option>
//         </select>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700"
//         >
//           {loading ? "Creating..." : "Create"}
//         </button>
//       </form>

//       {/* Table */}
//       <div className="bg-white shadow rounded-xl overflow-hidden">
//         <table className="w-full">

//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-t hover:bg-gray-50"
//                 >
//                   <td className="p-4">{user.name}</td>
//                   <td className="p-4">{user.email}</td>
//                   <td className="p-4">{user.role}</td>

//                   <td className="p-4 text-center">
//                     <button
//                       onClick={() =>
//                         handleDelete(user.id)
//                       }
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
//                   className="p-6 text-center text-gray-500"
//                 >
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }

// export default Users;

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

  // ===============================
  // GET USERS
  // ===============================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data.users || res.data);
    } catch (error) {
      console.log("Fetch Users Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // CREATE USER
  // ===============================
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/users", form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "USER",
      });

      fetchUsers();
    } catch (error) {
      console.log("Create User Error:", error);
      alert("User create failed");
    } finally {
      setLoading(false);
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
      {/* Title */}
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

      {/* Form */}
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

      {/* Table */}
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
            {users.length > 0 ? (
              users.map((user, index) => (
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
                      onClick={() =>
                        handleDelete(user.id)
                      }
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

// Reusable Styles
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