import { useEffect, useState } from "react";
import API from "../api/axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  const handleSubmit = async () => {
    await API.post("/complaints", { title, description });
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Complaints</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Complaint</button>

      {complaints.map((c) => (
        <div key={c.id}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Complaints;