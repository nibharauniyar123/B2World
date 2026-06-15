

// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// function Complaints() {

//   const [complaints, setComplaints] =
//     useState([]);

//   const [users, setUsers] =
//     useState([]);

//   const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value,
//   });
// };
// const [vendors, setVendors] = useState([]);

//   const [societies, setSocieties] =
//     useState([]);
//   const [editingId, setEditingId] =
//   useState(null);

//   const [loading, setLoading] =
//     useState(false);
// const [title, setTitle] = useState("");
// const [description, setDescription] = useState("");
//  const [file, setFile] = useState(null);
//   // const [image, setImage] = useState(null);
//   const [assignedStaff, setAssignedStaff] = useState("");

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     userId: "",
//     societyId: "",
//     vendorId: "",
//     assignedTo: "",
//     feedback: "",
//     rating: "",
//   });

// //   const vendorRes =
// //   await axios.get(
// //     "http://localhost:5000/api/vendors"
// //   );

// // setVendors(
// //   vendorRes.data.vendors ||
// //   vendorRes.data
// // );
//   // =========================
//   // FETCH DATA
//   // =========================

//   // const fetchData = async () => {

//   //   try {

//   //     const complaintRes =
//   //       await axios.get("http://localhost:5000/api/complaints");

//   //     const userRes =
//   //       await axios.get("http://localhost:5000/api/users");

//   //     const societyRes =
//   //       await axios.get("http://localhost:5000/api/societies");

//   //     setComplaints(
//   //       complaintRes.data
//   //     );

//   //     setUsers(
//   //       userRes.data.users ||
//   //       userRes.data
//   //     );

//   //     setSocieties(
//   //       societyRes.data.societies ||
//   //       societyRes.data
//   //     );

//   //   } catch (error) {

//   //     console.log(error);
//   //   }
//   // };

//   // useEffect(() => {

//   //   fetchData();

//   // }, []);
// //   const fetchData = async () => {
// //   try {

// //     const complaintRes =
// //       await axios.get(
// //         "http://localhost:5000/api/complaints"
// //       );

// //     const userRes =
// //       await axios.get(
// //         "http://localhost:5000/api/users"
// //       );

// //     const societyRes =
// //       await axios.get(
// //         "http://localhost:5000/api/societies"
// //       );

// //     const vendorRes =
// //       await axios.get(
// //         "http://localhost:5000/api/vendors"
// //       );

// //     setComplaints(
// //       complaintRes.data
// //     );

// //     setUsers(
// //       userRes.data.users ||
// //       userRes.data
// //     );

// //     setSocieties(
// //       societyRes.data.societies ||
// //       societyRes.data
// //     );

// //     setVendors(
// //       vendorRes.data.vendors ||
// //       vendorRes.data
// //     );

// //   } catch (error) {
// //     console.log(error);
// // console.log("Users =>", userRes.data);
// // console.log("Societies =>", societyRes.data);
// // console.log("Vendors =>", vendorRes.data);
// //   }
// // };
// const fetchData = async () => {
//   try {
//     setLoading(true);
    
//     // Fetch with society filter if needed
//     const [userRes, societyRes, vendorRes] = await Promise.all([
//       axios.get('/api/users?role=RESIDENT,OWNER,TENANT', { 
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
//       }),
//       axios.get('/api/societies', { 
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
//       }),
//       axios.get('/api/vendors', { 
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
//       })
//     ]);

//     console.log("Users =>", userRes.data);
//     console.log("Societies =>", societyRes.data);
//     console.log("Vendors =>", vendorRes.data);

//     setUsers(userRes.data.users || userRes.data || []);
//     setSocieties(societyRes.data.societies || societyRes.data || []);
//     setVendors(vendorRes.data.vendors || vendorRes.data || []);

//   } catch (error) {
//     console.error("Fetch error:", error.response?.data || error.message);
//     toast.error("Failed to load dropdown data");
//   } finally {
//     setLoading(false);
//   }
// };

//   // =========================
//   // CREATE COMPLAINT
//   // =========================

//   const handleCreate =
//     async (e) => {

//       e.preventDefault();

//       try {

//         setLoading(true);

//         const formData =
//           new FormData();

//         formData.append(
//           "title",
//           form.title
//         );

//         formData.append(
//           "description",
//           form.description
//         );

//         formData.append(
//           "userId",
//           form.userId
//         );

//         formData.append(
//           "societyId",
//           form.societyId
//         );

//        formData.append(
//   "assignedStaff",
//   form.assignedTo
// );
// formData.append("vendorId", form.vendorId);
  
// formData.append(
//           "feedback",
//           form.feedback
//         );

//         formData.append(
//           "rating",
//           form.rating
//         );

//         if (file) {

//           formData.append(
//             "file",
//             file      
//           );
        
//         }
//         await axios.post(
//           "http://localhost:5000/api/complaints",
//           formData,
//           {
//             headers: {
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//         alert(

//           "Complaint Added"
//         );

//         setForm({
//           title: "",
//           description: "",
//           userId: "",
//           societyId: "",
//           assignedTo: "",
//           vendorId: "",
//           feedback: "",
//           rating: "",
//         });

//         setFile (null);

//         fetchData();

//       } catch (error) {

//         console.log(error);

//         alert(
//           "Complaint create failed"
//         );

//       } finally {

//         setLoading(false);
//       }
//     };

//   const handleUpdate = async () => {

//   try {

//     await axios.put(
//       `http://localhost:5000/api/complaints/${editingId}`,
//       form
//     );

//     alert("Complaint Updated");

//     setEditingId(null);

//     setForm({
//       title: "",
//       description: "",
//       userId: "",
//       societyId: "",
//       vendorId: "",
//       assignedTo: "",
//       feedback: "",
//       rating: "",
//     });

//     fetchData();

//   } catch (error) {

//     console.log(error);

//     alert("Update failed");
//   }
// };
//   //Edit Complaint
// const handleEdit = (complaint) => {

//   setEditingId(complaint.id);

//   setForm({
//     title: complaint.title,
//     description: complaint.description,
//     userId: complaint.userId,
//     societyId: complaint.societyId,
//     vendorId: complaint.vendorId || "",
//     assignedTo:
//       complaint.assignedStaff || "",
//     feedback:
//       complaint.feedback || "",
//     rating:
//       complaint.rating || "",
//   });
// };

// //update Complaint

//   // =========================
//   // DELETE
//   // =========================

//   const handleDelete =
//     async (id) => {

//       try {

//         await axios.delete(
//           `http://localhost:5000/api/complaints/${id}`
//         );

//         fetchData();

//       } catch (error) {

//         console.log(error);
//       }
//     };

//   // =========================
//   // STATUS UPDATE
//   // =========================

//   const updateStatus =
//     async (id, status) => {

//       try {

//         await axios.put(
//           `http://localhost:5000/api/complaints/${id}/status`,
//           { status }
//         );

//         fetchData();

//       } catch (error) {

//         console.log(error);
//       }
//     };

//   return (

//     <div style={styles.page}>

//       <h1 style={styles.title}>
//         Complaints Management
//       </h1>

//       {/* FORM */}

//       <form
//         onSubmit={handleCreate}
//         style={styles.form}
//       >

//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               title: e.target.value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               description:
//                 e.target.value,
//             })
//           }
//           style={styles.input}
//           required
//         />

//         {/* USER */}

//        <select
//   name="userId"
//   value={form.userId}
//   onChange={handleChange}
//   style={styles.input}
//   required
// >
//   <option value="">
//     Select User
//   </option>

//   {users.map((user) => (
//     <option
//       key={user.id}
//       value={user.id}
//     >
//       {user.name}
//     </option>
//   ))}
// </select>

//         {/* SOCIETY */}

//         <select
//           name="societyId"
//           value={form.societyId}
//           onChange={handleChange}
//           style={styles.input}
//           required
//         >

//           <option value="">
//             Select Society
//           </option>

//           {societies.map((society) => (
//   <option
//     key={society.id}
//     value={society.id}
//   >
//     {society.name}
//   </option>
// ))}
//         </select>

//         {/* ASSIGNED STAFF */}

//         <input
//           type="text"
//           placeholder="Assign Staff"

//           value={form.assignedTo}

//           onChange={(e) =>
//             setForm({
//               ...form,
//               assignedTo:
//                 e.target.value,
//             })
//           }

//           style={styles.input}
//         />
//         <select
//   name="vendorId"
//   value={form.vendorId}
//   onChange={handleChange}
//   style={styles.input}
//   required
// >
//   <option value="">
//     Select Vendor
//   </option>

//  {vendors.map((vendor) => (
//   <option
//     key={vendor.id}
//     value={vendor.id}
//   >
//     {vendor.name}
//   </option>
// ))}
// </select>

//         {/* FEEDBACK */}

//         <input
//           type="text"
//           placeholder="Feedback"

//           value={form.feedback}

//           onChange={(e) =>
//             setForm({
//               ...form,
//               feedback:
//                 e.target.value,
//             })
//           }

//           style={styles.input}
//         />

//         {/* RATING */}

//         <input
//           type="number"
//           placeholder="Rating"

//           value={form.rating}

//           onChange={(e) =>
//             setForm({
//               ...form,
//               rating:
//                 e.target.value,
//             })
//           }

//           style={styles.input}
//         />

//         {/* FILE */}

//         <input
//           type="file"

//           onChange={(e) =>
//             setFile(
//               e.target.files[0]
//             )
//           }

//           style={styles.input}
//         />

//         <button
//         type="submit"
//           style={styles.button}
//   onClick={
//     editingId
//       ? handleUpdate
//       : handleCreate
//   }
// >
//   {
//     editingId
//       ? "Update Complaint"
//       : "Add Complaint"
//   }
// </button>

      

//       </form>

//       {/* TABLE */}

//       <div style={styles.tableCard}>

//         <table style={styles.table}>

//           <thead>

//             <tr>

//               <th style={styles.th}>
//                 Title
//               </th>

//               <th style={styles.th}>
//                 Description
//               </th>

//               <th style={styles.th}>
//                 Image
//               </th>

//               <th style={styles.th}>
//                 Staff
//               </th>

//               <th style={styles.th}>
//                 Feedback
//               </th>

//               <th style={styles.th}>
//                 Rating
//               </th>

//               <th style={styles.th}>
//                 Status
//               </th>

//               <th style={styles.th}>
//                 Date
//               </th>

//               <th style={styles.th}>
//                 Action
//               </th>
//               <th style={styles.th}>Resolution Time</th>

//             </tr>

//           </thead>

//           <tbody>

           
// {complaints.map((item) => (
// <tr key={item.id}>

// <td>{item.title}</td>

// <td>{item.description}</td>


// <td>
//   {item.image ? (
//     <img
//       src={`http://localhost:5000${item.image}`}
//       alt="complaint"
//       style={{
//         width: "70px",
//         height: "70px",
//         objectFit: "cover",
//       }}
//     />
//   ) : (
//     "No Image"
//   )}
// </td>

// {/* <td>
//   {item.assignedStaff || "Not Assigned"}
// </td> */}
// {/* <td>  
//   {item.vendor?.name || "Not Assigned"}
// </td> */}
// <td>
//   {item.vendor?.name ||
//    item.assignedStaff ||
//    "Not Assigned"}
// </td>

// <td>{item.feedback}</td>

// <td>{item.rating}</td>
//               {/* <td>{item.resolutionTime || "Not Resolved"}</td> */}
//               <td>
//   {item.assignedAt && item.resolvedAt
//     ? `${Math.round(
//         (new Date(item.resolvedAt) -
//          new Date(item.assignedAt))
//         / (1000 * 60 * 60)
//       )} hrs`
//     : "-"
//   }
// </td>

//                 {/* STATUS */}

//                 <td style={styles.td}>

//                   <select
//                     value={item.status}

//                     onChange={(e) =>
//                       updateStatus(
//                         item.id,
//                         e.target.value
//                       )
//                     }

//                     style={styles.status}
//                   >

//                     <option>
//                       OPEN
//                     </option>

//                     <option>
//                       IN_PROGRESS
//                     </option>

//                     <option>
//                       RESOLVED
//                     </option>

//                   </select>
//                 </td>

//                 <td style={styles.td}>

//                   {new Date(
//                     item.createdAt
//                   ).toLocaleDateString()}

//                 </td>

//                 <td style={styles.td}>
//                     {/* <button
//   onClick={() => handleEdit(item)}
//   className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
// >
//   Edit */}
// {/* </button>
//                   <button
//                     onClick={() =>
//                       handleDelete(
//                         item.id
//                       )
//                     }

//                     style={
//                       styles.deleteBtn
//                     }
//                   >

//                     Delete

//                   </button> */}
//                   <button
//   type="button"
//   style={styles.button}
//   onClick={() =>
//     editingId
//       ? handleUpdate()
//       : handleCreate(
//           new Event("submit")
//         )
//   }
// >
//   {editingId
//     ? "Update Complaint"
//     : "Add Complaint"}
// </button>

//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Complaints;

// const styles = {
//   page: {
//     padding: "30px",
//     background: "#f4f7fb",
//     minHeight: "100vh",
//   },

//   title: {
//     fontSize: "38px",
//     fontWeight: "700",
//     marginBottom: "25px",
//   },

//   form: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(220px,1fr))",
//     gap: "15px",
//     background: "#fff",
//     padding: "25px",
//     borderRadius: "18px",
//     marginBottom: "30px",
//   },

//   input: {
//     padding: "14px",
//     border:
//       "1px solid #ddd",
//     borderRadius: "12px",
//   },

//   button: {
//     background: "#2563eb",
//     color: "#fff",
//     border: "none",
//     borderRadius: "12px",
//     fontWeight: "600",
//     cursor: "pointer",
//     padding: "14px",
//   },

//   tableCard: {
//     background: "#fff",
//     borderRadius: "18px",
//     overflow: "hidden",
//   },

//   table: {
//     width: "100%",
//     borderCollapse:
//       "collapse",
//   },

//   th: {
//     background: "#eef2f7",
//     padding: "16px",
//     textAlign: "left",
//   },

//   td: {
//     padding: "16px",
//     borderTop:
//       "1px solid #eee",
//   },

//   status: {
//     padding: "8px",
//     borderRadius: "10px",
//   },

//   deleteBtn: {
//     background: "#ef4444",
//     color: "#fff",
//     border: "none",
//     padding: "10px 15px",
//     borderRadius: "10px",
//     cursor: "pointer",
//   },
// };

import { useEffect, useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";   // Make sure this is installed and imported

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: "",
    societyId: "",
    vendorId: "",
    assignedTo: "",
    feedback: "",
    rating: "",
  });

  const [file, setFile] = useState(null);

  // =========================
  // FETCH DATA
  // =========================
// const fetchData = async () => {
//   try {
//     setLoading(true);

//     const [complaintRes, userRes, societyRes, vendorRes] = await Promise.all([
//       axios.get('/api/complaints'),
//       axios.get('/api/users'),
//       axios.get('/api/societies'),
//       axios.get('/api/vendors')
//     ]);

// console.log("Users =", users);
// console.log("Societies =", societies);
// console.log("Vendors =", vendors);
//     // Handle different possible response structures
//     setUsers(Array.isArray(userRes.data) ? userRes.data : userRes.data.users || userRes.data.data || []);
//     setSocieties(Array.isArray(societyRes.data) ? societyRes.data : societyRes.data.societies || []);
//     setVendors(Array.isArray(vendorRes.data) ? vendorRes.data : vendorRes.data.vendors || []);
//     setComplaints(Array.isArray(complaintRes.data) ? complaintRes.data : complaintRes.data.complaints || []);

//   } catch (error) {
//     console.error("❌ Error Details:", error.response?.data || error.message);
//     toast.error("Cannot load data - Backend issue");
//   } finally {
//     setLoading(false);
//   }
// useEffect(() => {
//   fetchData();
// }, []);
// };
const fetchData = async () => {
  try {
    setLoading(true);

    const [
      complaintRes,
      userRes,
      societyRes,
      vendorRes
    ] = await Promise.all([
      axios.get("/api/complaints"),
      axios.get("/api/users"),
      axios.get("/api/societies"),
      axios.get("/api/vendors")
    ]);

    setUsers(
      Array.isArray(userRes.data)
        ? userRes.data
        : userRes.data.users || []
    );

    setSocieties(
      Array.isArray(societyRes.data)
        ? societyRes.data
        : societyRes.data.societies || []
    );

    setVendors(
      Array.isArray(vendorRes.data)
        ? vendorRes.data
        : vendorRes.data.vendors || []
    );

    setComplaints(
      Array.isArray(complaintRes.data)
        ? complaintRes.data
        : complaintRes.data.complaints || []
    );

  } catch (error) {
    console.log(error);
    toast.error("Failed to load data");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);
// =========================
  // HANDLE FORM CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE / UPDATE COMPLAINT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("userId", form.userId);
      formData.append("societyId", form.societyId);
      formData.append("vendorId", form.vendorId || "");
      formData.append("assignedStaff", form.assignedTo || "");
      formData.append("feedback", form.feedback || "");
      formData.append("rating", form.rating || "");

      if (file) {
        formData.append("file", file);
      }

      if (editingId) {
        // Update
        await axios.put(`/api/complaints/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Complaint updated successfully");
      } else {
        // Create
        await axios.post("/api/complaints", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Complaint added successfully");
      }

      setForm({
        title: "",
        description: "",
        userId: "",
        societyId: "",
        vendorId: "",
        assignedTo: "",
        feedback: "",
        rating: "",
      });
      setFile(null);
      setEditingId(null);
      fetchData();

    } catch (error) {
      console.error(error);
      toast.error(editingId ? "Failed to update complaint" : "Failed to create complaint");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (complaint) => {
    setEditingId(complaint.id);
    setForm({
      title: complaint.title,
      description: complaint.description,
      userId: complaint.userId || "",
      societyId: complaint.societyId || "",
      vendorId: complaint.vendorId || "",
      assignedTo: complaint.assignedStaff || "",
      feedback: complaint.feedback || "",
      rating: complaint.rating || "",
    });
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    try {
      await axios.delete(`/api/complaints/${id}`);
      toast.success("Complaint deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================
  // const updateStatus = async (id, status) => {
  //   try {
  //     await axios.put(`/api/complaints/${id}/status`, { status });
  //     toast.success("Status updated");
  //     fetchData();
  //   } catch (error) {
  //     toast.error("Failed to update status");
  //   }
  // };
  const updateStatus =
async(id,status)=>{

 try{

  if(status==="RESOLVED"){

   await axios.put(
    `http://localhost:5000/api/complaints/${id}/resolve`
   );

  }else{

   await axios.put(
    `http://localhost:5000/api/complaints/${id}/status`,
    {status}
   );

  }

  fetchData();

 }catch(error){

  console.log(error);

 }

};

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Complaints Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.input}
          required
        />

     <select
  value={form.userId}
  onChange={(e) =>
    setForm({
      ...form,
      userId: e.target.value,
    })
  }
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

     <select
  value={form.societyId}
  onChange={(e) =>
    setForm({
      ...form,
      societyId: e.target.value,
    })
  }
  required
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
  value={form.vendorId}
  onChange={(e) =>
    setForm({
      ...form,
      vendorId: e.target.value,
    })
  }
>
  <option value="">
    Select Vendor
  </option>

  {vendors.map((vendor) => (
    <option
      key={vendor.id}
      value={vendor.id}
    >
      {vendor.name}
    </option>
  ))}
</select>

        <input
          type="text"
          name="assignedTo"
          placeholder="Assign Staff"
          value={form.assignedTo}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          style={styles.input}
          min="1"
          max="5"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Processing..." : editingId ? "Update Complaint" : "Add Complaint"}
        </button>
      </form>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Staff / Vendor</th>
              <th style={styles.th}>Feedback</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Actions</th>
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
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{item.vendor?.name || item.assignedStaff || "Not Assigned"}</td>
                <td>{item.feedback || "-"}</td>
                <td>{item.rating || "-"}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </td>
                <td>
  {item.resolvedAt
    ? Math.floor(
        (
          new Date(item.resolvedAt)
          -
          new Date(item.createdAt)
        ) /
        (1000 * 60 * 60)
      ) + " hrs"
    : "-"
  }
</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: "8px", background: "#08d3ea" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: "#ef4444" }}>
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
  page: { padding: "30px", background: "#f4f7fb", minHeight: "100vh" },
  title: { fontSize: "38px", fontWeight: "700", marginBottom: "25px" },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "30px",
  },
  input: { padding: "14px", border: "1px solid #ddd", borderRadius: "12px" },
  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    cursor: "pointer",
    fontWeight: "600",
  },
  tableCard: { background: "#fff", borderRadius: "18px", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#eef2f7", padding: "16px", textAlign: "left" },
};