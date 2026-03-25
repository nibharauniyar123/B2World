// import { useEffect,useState } from "react"
// import API from "../api/axios"
// import Sidebar from "../components/Sidebar"
// import Navbar from "../components/Navbar"

// function Users(){

//  const [users,setUsers] = useState([])
//  const [page,setPage] = useState(1)
//  const [search,setSearch] = useState("")

//  const fetchUsers = async()=>{

//   const res = await API.get(`/users?page=${page}&search=${search}`)

//   setUsers(res.data.users)

//  }

//  useEffect(()=>{
//   fetchUsers()
//  },[page,search])

//  return(

//   <div style={{display:"flex"}}>

//    <Sidebar/>

//    <div style={{flex:1}}>

//     <Navbar/>

//     <h2>Users</h2>

//     <input
//      placeholder="Search users"
//      onChange={(e)=>setSearch(e.target.value)}
//     />

//     <table border="1">

//      <thead>

//       <tr>
//        <th>ID</th>
//        <th>Name</th>
//        <th>Email</th>
//        <th>Role</th>
//       </tr>

//      </thead>

//      <tbody>

//       {users.map((user)=>(
//        <tr key={user.id}>

//         <td>{user.id}</td>
//         <td>{user.name}</td>
//         <td>{user.email}</td>
//         <td>{user.role}</td>

//        </tr>
//       ))}

//      </tbody>

//     </table>

//     <button onClick={()=>setPage(page-1)}>
//      Prev
//     </button>

//     <button onClick={()=>setPage(page+1)}>
//      Next
//     </button>

//    </div>

//   </div>

//  )

// }

// export default Users

import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/users?page=${page}&search=${search}`
      );

      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [page, search]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <h2>Users</h2>

        <input
          placeholder="Search users"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on search
          }}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>Page: {page}</span>

          <button onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Users;