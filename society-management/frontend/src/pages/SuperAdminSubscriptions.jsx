import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function SuperAdminSubscriptions() {

  const [subscriptions, setSubscriptions] = useState([]);
  const [societies, setSocieties] = useState([]);

  const [form, setForm] = useState({
    societyId: "",
    plan: "BASIC",
    price: "",
    startDate: "",
    endDate: "",
  });

  const [editingId, setEditingId] =
    useState(null);


  const token = localStorage.getItem("token");


  const fetchData = async () => {

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      const [
        subscriptionResponse,
        societyResponse,
      ] = await Promise.all([

        axios.get(
          `${API}/api/super-admin/subscriptions`,
          config
        ),

        axios.get(
          `${API}/api/super-admin/societies`,
          config
        ),

      ]);


      setSubscriptions(
        subscriptionResponse.data
      );

      setSocieties(
        societyResponse.data
      );

    } catch (error) {

      console.error(
        "SUBSCRIPTION FETCH ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load subscriptions"
      );
    }
  };


  useEffect(() => {
    fetchData();
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

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      if (editingId) {

        await axios.put(
          `${API}/api/super-admin/subscriptions/${editingId}`,
          form,
          config
        );

        alert(
          "Subscription updated successfully"
        );

      } else {

        await axios.post(
          `${API}/api/super-admin/subscriptions`,
          form,
          config
        );

        alert(
          "Subscription created successfully"
        );
      }


      resetForm();

      fetchData();

    } catch (error) {

      console.error(
        "SUBSCRIPTION SAVE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to save subscription"
      );
    }
  };


  const handleEdit = (subscription) => {

    setEditingId(subscription.id);

    setForm({
      societyId: subscription.societyId,
      plan: subscription.plan,
      price: subscription.price,
      startDate:
        subscription.startDate.substring(0, 10),
      endDate:
        subscription.endDate.substring(0, 10),
    });
  };


  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this subscription?"
      )
    ) {
      return;
    }


    try {

      await axios.delete(
        `${API}/api/super-admin/subscriptions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      alert(
        "Subscription deleted successfully"
      );

      fetchData();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to delete subscription"
      );
    }
  };


  const resetForm = () => {

    setEditingId(null);

    setForm({
      societyId: "",
      plan: "BASIC",
      price: "",
      startDate: "",
      endDate: "",
    });
  };


  return (
    <div style={{ padding: "40px" }}>

      <h1>Subscription Management</h1>

      <p>
        Manage Basic and Premium subscriptions.
      </p>


      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <select
          name="societyId"
          value={form.societyId}
          onChange={handleChange}
          required
          disabled={!!editingId}
        >

          <option value="">
            Select Society
          </option>

          {societies.map((society) => (
            <option
              key={society.id}
              value={society.id}
            >
              {society.name}
            </option>
          ))}

        </select>


        <select
          name="plan"
          value={form.plan}
          onChange={handleChange}
        >

          <option value="BASIC">
            BASIC
          </option>

          <option value="PREMIUM">
            PREMIUM
          </option>

        </select>


        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />


        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />


        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />


        <button type="submit">
          {editingId
            ? "Update Subscription"
            : "Create Subscription"}
        </button>


        {editingId && (
          <button
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}

      </form>


      {/* TABLE */}

      <h2>All Subscriptions</h2>

      <table
        width="100%"
        cellPadding="15"
      >

        <thead>

          <tr>
            <th>Society</th>
            <th>Plan</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>

          {subscriptions.map(
            (subscription) => {

              const active =
                new Date(
                  subscription.endDate
                ) >= new Date();

              return (

                <tr key={subscription.id}>

                  <td>
                    {subscription.society?.name}
                  </td>

                  <td>
                    {subscription.plan}
                  </td>

                  <td>
                    NPR {subscription.price}
                  </td>

                  <td>
                    {new Date(
                      subscription.startDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(
                      subscription.endDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {active
                      ? "ACTIVE"
                      : "EXPIRED"}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleEdit(
                          subscription
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          subscription.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
}

export default SuperAdminSubscriptions;