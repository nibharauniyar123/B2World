

import { useEffect, useState } from "react";
import axios from "../utils/axios";

function Complaints() {

  const [complaints, setComplaints] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [societies, setSocieties] =
    useState([]);
  const [editingId, setEditingId] =
  useState(null);

  const [loading, setLoading] =
    useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
 const [file, setFile] = useState(null);
  // const [image, setImage] = useState(null);
  const [assignedStaff, setAssignedStaff] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: "",
    societyId: "",

    assignedTo: "",

    feedback: "",

    rating: "",
  });

  // =========================
  // FETCH DATA
  // =========================

  const fetchData = async () => {

    try {

      const complaintRes =
        await axios.get("/complaints");

      const userRes =
        await axios.get("/users");

      const societyRes =
        await axios.get("/societies");

      setComplaints(
        complaintRes.data
      );

      setUsers(
        userRes.data.users ||
        userRes.data
      );

      setSocieties(
        societyRes.data.societies ||
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
  // CREATE COMPLAINT
  // =========================

  const handleCreate =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          form.title
        );

        formData.append(
          "description",
          form.description
        );

        formData.append(
          "userId",
          form.userId
        );

        formData.append(
          "societyId",
          form.societyId
        );

       formData.append(
  "assignedStaff",
  form.assignedTo
);

        formData.append(
          "feedback",
          form.feedback
        );

        formData.append(
          "rating",
          form.rating
        );

        if (file) {

          formData.append(
            "file",
            file      
          );
        
        }
        await axios.post(
          "/complaints",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(

          "Complaint Added"
        );

        setForm({
          title: "",
          description: "",
          userId: "",
          societyId: "",
          assignedTo: "",
          feedback: "",
          rating: "",
        });

        setFile (null);

        fetchData();

      } catch (error) {

        console.log(error);

        alert(
          "Complaint create failed"
        );

      } finally {

        setLoading(false);
      }
    };

  const handleUpdate = async () => {

  try {

    await axios.put(
      `/complaints/${editingId}`,
      form
    );

    alert("Complaint Updated");

    setEditingId(null);

    setForm({
      title: "",
      description: "",
      userId: "",
      societyId: "",
      assignedTo: "",
      feedback: "",
      rating: "",
    });

    fetchData();

  } catch (error) {

    console.log(error);

    alert("Update failed");
  }
};
  //Edit Complaint
const handleEdit = (complaint) => {

  setEditingId(complaint.id);

  setForm({
    title: complaint.title,
    description: complaint.description,
    userId: complaint.userId,
    societyId: complaint.societyId,
    assignedTo:
      complaint.assignedStaff || "",
    feedback:
      complaint.feedback || "",
    rating:
      complaint.rating || "",
  });
};

//update Complaint

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
    async (id, status) => {

      try {

        await axios.put(
          `/complaints/${id}/status`,
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
        Complaints Management
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleCreate}
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

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          style={styles.input}
          required
        />

        {/* USER */}

        <select
          value={form.userId}
          onChange={(e) =>
            setForm({
              ...form,
              userId:
                e.target.value,
            })
          }
          style={styles.input}
          required
        >

          <option value="">
            Select User
          </option>

          {users.map((user) => (

            <option
              key={user.id}
              value={user.id}
            >

              {user.name}

            </option>
          ))}
        </select>

        {/* SOCIETY */}

        <select
          value={form.societyId}
          onChange={(e) =>
            setForm({
              ...form,
              societyId:
                e.target.value,
            })
          }
          style={styles.input}
          required
        >

          <option value="">
            Select Society
          </option>

          {societies.map(
            (society) => (

              <option
                key={society.id}
                value={society.id}
              >

                {society.name}

              </option>
            )
          )}
        </select>

        {/* ASSIGNED STAFF */}

        <input
          type="text"
          placeholder="Assign Staff"

          value={form.assignedTo}

          onChange={(e) =>
            setForm({
              ...form,
              assignedTo:
                e.target.value,
            })
          }

          style={styles.input}
        />

        {/* FEEDBACK */}

        <input
          type="text"
          placeholder="Feedback"

          value={form.feedback}

          onChange={(e) =>
            setForm({
              ...form,
              feedback:
                e.target.value,
            })
          }

          style={styles.input}
        />

        {/* RATING */}

        <input
          type="number"
          placeholder="Rating"

          value={form.rating}

          onChange={(e) =>
            setForm({
              ...form,
              rating:
                e.target.value,
            })
          }

          style={styles.input}
        />

        {/* FILE */}

        <input
          type="file"

          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }

          style={styles.input}
        />

        <button
        type="submit"
          style={styles.button}
  onClick={
    editingId
      ? handleUpdate
      : handleCreate
  }
>
  {
    editingId
      ? "Update Complaint"
      : "Add Complaint"
  }
</button>

      

      </form>

      {/* TABLE */}

      <div style={styles.tableCard}>

        <table style={styles.table}>

          <thead>

            <tr>

              <th style={styles.th}>
                Title
              </th>

              <th style={styles.th}>
                Description
              </th>

              <th style={styles.th}>
                Image
              </th>

              <th style={styles.th}>
                Staff
              </th>

              <th style={styles.th}>
                Feedback
              </th>

              <th style={styles.th}>
                Rating
              </th>

              <th style={styles.th}>
                Status
              </th>

              <th style={styles.th}>
                Date
              </th>

              <th style={styles.th}>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

           
{complaints.map((item) => (
<tr key={item.id}>

<td>{item.title}</td>

<td>{item.description}</td>

<td>
  {item.image ? (
    <img
      src={`http://localhost:5000${item.image}`}
      alt="complaint"
      style={{
        width: "70px",
        height: "70px",
        objectFit: "cover",
      }}
    />
  ) : (
    "No Image"
  )}
</td>

<td>
  {item.assignedStaff || "Not Assigned"}
</td>

<td>{item.feedback}</td>

<td>{item.rating}</td>


                {/* STATUS */}

                <td style={styles.td}>

                  <select
                    value={item.status}

                    onChange={(e) =>
                      updateStatus(
                        item.id,
                        e.target.value
                      )
                    }

                    style={styles.status}
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

                <td style={styles.td}>

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}

                </td>

                <td style={styles.td}>
                    <button
  onClick={() => handleEdit(item)}
  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>
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

export default Complaints;

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
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "30px",
  },

  input: {
    padding: "14px",
    border:
      "1px solid #ddd",
    borderRadius: "12px",
  },

  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    padding: "14px",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
  },

  th: {
    background: "#eef2f7",
    padding: "16px",
    textAlign: "left",
  },

  td: {
    padding: "16px",
    borderTop:
      "1px solid #eee",
  },

  status: {
    padding: "8px",
    borderRadius: "10px",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};