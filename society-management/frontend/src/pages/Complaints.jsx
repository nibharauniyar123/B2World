import { useEffect, useState } from "react";
import API from "../api/api";

export default function Complaints(){

 const [complaints,setComplaints] = useState([]);
 const [title,setTitle] = useState("");
 const [description,setDescription] = useState("");

 useEffect(()=>{
   loadComplaints();
 },[]);

 const loadComplaints = async()=>{
   const res = await API.get("/complaints");
   setComplaints(res.data);
 }

 const createComplaint = async()=>{
   await API.post("/complaints",{title,description});
   loadComplaints();
 }

 return(

  <div>

    <h2>Complaints</h2>

    <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
    <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />

    <button onClick={createComplaint}>Submit</button>

    <table border="1">

      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {complaints.map(c=>(
          <tr key={c.id}>
            <td>{c.title}</td>
            <td>{c.description}</td>
            <td>{c.status}</td>
          </tr>
        ))}

      </tbody>

    </table>

  </div>

 )
}