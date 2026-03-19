import { useEffect,useState } from "react"
import API from "../api/axios"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function Users(){

 const [users,setUsers] = useState([])
 const [page,setPage] = useState(1)
 const [search,setSearch] = useState("")

 const fetchUsers = async()=>{

  const res = await API.get(`/users?page=${page}&search=${search}`)

  setUsers(res.data.users)

 }

 useEffect(()=>{
  fetchUsers()
 },[page,search])

 return(

  <div style={{display:"flex"}}>

   <Sidebar/>

   <div style={{flex:1}}>

    <Navbar/>

    <h2>Users</h2>

    <input
     placeholder="Search users"
     onChange={(e)=>setSearch(e.target.value)}
    />

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

      {users.map((user)=>(
       <tr key={user.id}>

        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>

       </tr>
      ))}

     </tbody>

    </table>

    <button onClick={()=>setPage(page-1)}>
     Prev
    </button>

    <button onClick={()=>setPage(page+1)}>
     Next
    </button>

   </div>

  </div>

 )

}

export default Users