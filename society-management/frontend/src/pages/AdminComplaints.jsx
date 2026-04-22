import { useEffect, useState } from "react";
import {
  getAllComplaints,
  updateStatus,
} from "../services/complaintService";

export default function AdminComplaints() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = () => {
    getAllComplaints(token).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (id, status) => {
    await updateStatus(id, status, token);
    fetchData(); // refresh after update
  };

  return (
    <div>
      <h2>All Complaints (Admin)</h2>

      {data.map((c) => (
        <div key={c.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>User: {c.user?.email}</p>
          <p>Society: {c.society?.name}</p>

          <p>Status: {c.status}</p>

          {/* 🔥 THIS IS YOUR CODE */}
          <select
            value={c.status}
            onChange={(e) => handleChange(c.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
}