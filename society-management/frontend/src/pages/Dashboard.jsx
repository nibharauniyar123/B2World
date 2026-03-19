import { useEffect,useState } from "react"
import API from "../api/axios"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function Dashboard(){

 const [stats,setStats] = useState(null)

 useEffect(()=>{

  const fetchStats = async()=>{

   const res = await API.get("/dashboard")

   setStats(res.data)

  }

  fetchStats()

 },[])

 return(

  <div style={{display:"flex"}}>

   <Sidebar/>

   <div style={{flex:1}}>

    <Navbar/>

    <h2>Dashboard</h2>

    {stats && (

     <div>

      <p>Total Users: {stats.totalUsers}</p>

      <p>Total Societies: {stats.totalSocieties}</p>

     </div>

    )}

   </div>

  </div>

 )

}

export default Dashboard