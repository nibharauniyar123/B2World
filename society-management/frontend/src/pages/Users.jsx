

// import { useEffect, useState } from "react"
// import API from "../api/axios"

// function Users(){

//  const [users,setUsers] = useState([])
//  const [name,setName] = useState("")
//  const [email,setEmail] = useState("")

//  const fetchUsers = async()=>{
//   const res = await API.get("/users")
//   setUsers(res.data.users)
//  }

//  useEffect(()=>{
//   fetchUsers()
//  },[])

//  const createUser = async()=>{

//   await API.post("/users",{
//    name,
//    email
//   })

//   setName("")
//   setEmail("")

//   fetchUsers()
//  }

//  const deleteUser = async(id)=>{

//   await API.delete(`/users/${id}`)
//   fetchUsers()

//  }

//  return(

//   <div style={{padding:"20px"}}>

//    <h2>Users</h2>

//    <div style={{display:"flex",gap:"10px",marginBottom:"20px"}}>

//     <input
//      placeholder="Name"
//      value={name}
//      onChange={(e)=>setName(e.target.value)}
//     />

//     <input
//      placeholder="Email"
//      value={email}
//      onChange={(e)=>setEmail(e.target.value)}
//     />

//     <button onClick={createUser}>
//      Create
//     </button>

//    </div>

//    <table border="1" width="100%">

//     <thead>

//      <tr>
//       <th>Name</th>
//       <th>Email</th>
//       <th>Action</th>
//      </tr>

//     </thead>

//     <tbody>

//      {users.map(u=>(

//       <tr key={u.id}>

//        <td>{u.name}</td>
//        <td>{u.email}</td>

//        <td>

//         <button onClick={()=>deleteUser(u.id)}>
//          Delete
//         </button>

//        </td>

//       </tr>

//      ))}

//     </tbody>

//    </table>

//   </div>

//  )

// }

// export default Users

import { useEffect, useState } from "react"
import API from "../api/axios"

function Users(){

 const [users,setUsers] = useState([])
 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [loading,setLoading] = useState(false)

 // Fetch Users
 const fetchUsers = async ()=>{

  try{

   const res = await API.get("/users")

   setUsers(res.data.users)

  }catch(err){
   console.error(err)
  }

 }

 useEffect(()=>{
  fetchUsers()
 },[])

 // Create User
 const createUser = async ()=>{

  if(!name || !email || !password){
   alert("Please fill all fields")
   return
  }

  try{

   setLoading(true)

   await API.post("/users",{
    name,
    email,
    password,
    role:"USER"
   })

   setName("")
   setEmail("")
   setPassword("")

   fetchUsers()

  }catch(err){
   console.error(err)
  }finally{
   setLoading(false)
  }

 }

 // Delete User
 const deleteUser = async(id)=>{

  try{

   await API.delete(`/users/${id}`)

   fetchUsers()

  }catch(err){
   console.error(err)
  }

 }

 return(

  <div style={{padding:"20px"}}>

   <h2 style={{marginBottom:"20px"}}>
    Users
   </h2>

   {/* Form */}

   <div style={{
    border:"1px solid #ccc",
    padding:"15px",
    borderRadius:"6px",
    marginBottom:"20px",
    display:"flex",
    gap:"10px"
   }}>

    <input
     placeholder="Name"
     value={name}
     onChange={(e)=>setName(e.target.value)}
     style={{
      padding:"8px",
      border:"1px solid #ccc",
      borderRadius:"4px"
     }}
    />

    <input
     placeholder="Email"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
     style={{
      padding:"8px",
      border:"1px solid #ccc",
      borderRadius:"4px"
     }}
    />

    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     style={{
      padding:"8px",
      border:"1px solid #ccc",
      borderRadius:"4px"
     }}
    />

    <button
     onClick={createUser}
     disabled={loading}
     style={{
      background:"#2563eb",
      color:"white",
      border:"none",
      padding:"8px 15px",
      borderRadius:"4px",
      cursor:"pointer"
     }}
    >
     {loading ? "Creating..." : "Create"}
    </button>

   </div>


   {/* Users Table */}

   <table style={{
    width:"100%",
    borderCollapse:"collapse"
   }}>

    <thead>

     <tr style={{background:"#f3f4f6"}}>

      <th style={{border:"1px solid #ccc",padding:"10px"}}>
       Name
      </th>

      <th style={{border:"1px solid #ccc",padding:"10px"}}>
       Email
      </th>

      <th style={{border:"1px solid #ccc",padding:"10px"}}>
       Action
      </th>

     </tr>

    </thead>

    <tbody>

     {users.length === 0 ? (

      <tr>

       <td colSpan="3" style={{padding:"15px",textAlign:"center"}}>
        No users found
       </td>

      </tr>

     ) : (

      users.map(user=>(

       <tr key={user.id}>

        <td style={{border:"1px solid #ccc",padding:"10px"}}>
         {user.name}
        </td>

        <td style={{border:"1px solid #ccc",padding:"10px"}}>
         {user.email}
        </td>

        <td style={{border:"1px solid #ccc",padding:"10px"}}>

         <button
          onClick={()=>deleteUser(user.id)}
          style={{
           background:"#ef4444",
           color:"white",
           border:"none",
           padding:"6px 10px",
           borderRadius:"4px",
           cursor:"pointer"
          }}
         >
          Delete
         </button>

        </td>

       </tr>

      ))

     )}

    </tbody>

   </table>

  </div>

 )

}

export default Users