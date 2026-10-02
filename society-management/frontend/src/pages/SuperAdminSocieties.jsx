import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function SuperAdminSocieties() {

  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchSocieties = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/api/super-admin/societies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSocieties(response.data);

    } catch (error) {

      console.error(
        "FETCH SOCIETIES ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to fetch societies"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchSocieties();
  }, []);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      if (editingId) {

        await axios.put(
          `${API}/api/super-admin/societies/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Society updated successfully");

      } else {

        await axios.post(
          `${API}/api/super-admin/societies`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Society created successfully");
      }

      setForm({
        name: "",
        address: "",
        city: "",
      });

      setEditingId(null);

      fetchSocieties();

    } catch (error) {

      console.error(
        "SAVE SOCIETY ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to save society"
      );
    }
  };


  const handleEdit = (society) => {

    setEditingId(society.id);

    setForm({
      name: society.name || "",
      address: society.address || "",
      city: society.city || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this society?"
    );

    if (!confirmed) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/api/super-admin/societies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Society deleted successfully");

      fetchSocieties();

    } catch (error) {

      console.error(
        "DELETE SOCIETY ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Society cannot be deleted"
      );
    }
  };


  const cancelEdit = () => {

    setEditingId(null);

    setForm({
      name: "",
      address: "",
      city: "",
    });
  };


  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >

      <h1>Society Management</h1>

      <p>
        Manage all registered societies from one place.
      </p>


      {/* FORM */}

      <div
        style={{
          background: "#fff",
          padding: "25px",
          marginTop: "30px",
          borderRadius: "12px",
        }}
      >

        <h2>
          {editingId
            ? "Edit Society"
            : "Add New Society"}
        </h2>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Society Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />


          <button type="submit">
            {editingId
              ? "Update Society"
              : "Add Society"}
          </button>


          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </form>

      </div>


      {/* SOCIETY LIST */}

      <div style={{ marginTop: "40px" }}>

        <h2>All Societies</h2>

        {loading ? (
          <p>Loading societies...</p>
        ) : societies.length === 0 ? (
          <p>No societies found.</p>
        ) : (

          <table
            width="100%"
            cellPadding="15"
            style={{
              background: "#fff",
              marginTop: "20px",
            }}
          >

            <thead>
              <tr>
                <th>Society</th>
                <th>Address</th>
                <th>City</th>
                <th>Users</th>
                <th>Flats</th>
                <th>Complaints</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {societies.map((society) => (

                <tr key={society.id}>

                  <td>
                    <strong>
                      {society.name}
                    </strong>
                  </td>

                  <td>
                    {society.address}
                  </td>

                  <td>
                    {society.city}
                  </td>

                  <td>
                    {society._count?.users || 0}
                  </td>

                  <td>
                    {society._count?.flats || 0}
                  </td>

                  <td>
                    {society._count?.complaints || 0}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEdit(society)
                      }
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(society.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default SuperAdminSocieties;