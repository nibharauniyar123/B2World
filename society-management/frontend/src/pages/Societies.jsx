import { useEffect,useState } from "react"
import API from "../api/axios"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function Societies(){

 const [societies,setSocieties] = useState([])
 const [name,setName] = useState("")

 const fetchSocieties = async()=>{

  const res = await API.get("/society")

  setSocieties(res.data)

 }

 useEffect(()=>{
  fetchSocieties()
 },[])

 const createSociety = async()=>{

  await API.post("/society",{name})

  fetchSocieties()

 }

 return(

  <div style={{display:"flex"}}>

   <Sidebar/>

   <div style={{flex:1}}>

    <Navbar/>

    <h2>Societies</h2>

    <input
     placeholder="Society name"
     onChange={(e)=>setName(e.target.value)}
    />

    <button onClick={createSociety}>
     Create
    </button>

    <ul>

     {societies.map((society)=>(
      <li key={society.id}>
       {society.name}
      </li>
     ))}

    </ul>

   </div>

  </div>

 )

}

export default Societies