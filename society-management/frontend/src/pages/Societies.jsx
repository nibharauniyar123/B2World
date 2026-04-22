

import { useEffect, useState } from "react";
import { getSocieties, createSociety, deleteSociety } from "../api/societyService";

export default function Societies() {

  const [societies, setSocieties] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadSocieties();
  }, []);

  const loadSocieties = async () => {
    const data = await getSocieties();
    setSocieties(data);
  };

  const handleCreate = async () => {
    await createSociety({ name, address });
    loadSocieties();
  };

  const handleDelete = async (id) => {
    await deleteSociety(id);
    loadSocieties();
  };

  return (
    <div>

      <h2>Societies</h2>

      <input
        placeholder="Society Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={handleCreate}>
        Create
      </button>

      <table border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {societies.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>

              <td>
                <button onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}