import { useEffect,useState } from "react"
import API from "../api/axios"

function Visitors(){

 const [visitors,setVisitors] = useState([])
 const [name,setName] = useState("")
 const [phone,setPhone] = useState("")
 const [vehicle,setVehicle] = useState("")
 const [residentId,setResidentId] = useState("")

 const fetchVisitors = async()=>{
  const res = await API.get("/visitors")
  setVisitors(res.data)
 }

 useEffect(()=>{
  fetchVisitors()
 },[])

 const createVisitor = async()=>{

  await API.post("/visitors",{
   name,
   phone,
   vehicle,
   residentId
  })

  fetchVisitors()
 }

 return(

  <div>

   <h2>Visitors</h2>

   <input
    placeholder="Name"
    onChange={(e)=>setName(e.target.value)}
   />

   <input
    placeholder="Phone"
    onChange={(e)=>setPhone(e.target.value)}
   />

   <input
    placeholder="Vehicle"
    onChange={(e)=>setVehicle(e.target.value)}
   />

   <input
    placeholder="Resident ID"
    onChange={(e)=>setResidentId(e.target.value)}
   />

   <button onClick={createVisitor}>
    Add Visitor
   </button>

<table style={styles.table}>

    <thead>
     <tr style={styles.tableHeader}>
      <th style={styles.th}>Name</th>
      <th style={styles.th}>Phone</th>
      <th style={styles.th}>Vehicle</th>
      <th style={styles.th}>Resident</th>
     </tr>
    </thead>

    <tbody>

     {visitors.map(v=>(
      <tr key={v.id} style={styles.tr}>
       <td style={styles.td}>{v.name}</td>
       <td style={styles.td}>{v.phone}</td>
       <td style={styles.td}>{v.vehicle}</td>
       <td style={styles.td}>{v.residentId}</td>
      </tr>
     ))}

    </tbody>

   </table>

  </div>

 )
}

const styles = {

 container:{
  padding:"20px",
  fontFamily:"Arial"
 },

 title:{
  marginBottom:"20px"
 },

 form:{
  marginBottom:"20px",
  display:"flex",
  gap:"10px"
 },

 input:{
  padding:"8px",
  border:"1px solid #ccc",
  borderRadius:"5px"
 },

 button:{
  padding:"8px 14px",
  background:"#2563eb",
  color:"#fff",
  border:"none",
  borderRadius:"5px",
  cursor:"pointer"
 },

 table:{
  width:"100%",
  borderCollapse:"collapse"
 },

 tableHeader:{
  background:"#f3f4f6"
 },

 th:{
  border:"1px solid #ddd",
  padding:"10px",
  textAlign:"left"
 },

 td:{
  border:"1px solid #ddd",
  padding:"10px"
 },

 tr:{
  background:"#fff"
 }

}

export default Visitors

// import {useEffect,useState} from "react"
// import API from "../api/axios"

// function Visitors(){

//  const [visitors,setVisitors] = useState([])
//  const [name,setName] = useState("")
//  const [phone,setPhone] = useState("")
//  const [vehicle,setVehicle] = useState("")
//  const [residentId,setResidentId] = useState("")

//  const fetchVisitors = async()=>{
//   const res = await API.get("/visitors")
//   setVisitors(res.data)
//  }

//  useEffect(()=>{
//   fetchVisitors()
//  },[])

//  const createVisitor = async()=>{

//   await API.post("/visitors",{
//    name,
//    phone,
//    vehicle,
//    residentId
//   })

//   fetchVisitors()
//  }

//  const deleteVisitor = async(id)=>{
//   await API.delete(`/visitors/${id}`)
//   fetchVisitors()
//  }

//  return(

//  <div>

//  <h2 className="text-xl font-bold mb-4">
//  Visitors
//  </h2>

//  <div className="flex gap-3 mb-4">

//  <input
//  className="border p-2"
//  placeholder="Name"
//  onChange={(e)=>setName(e.target.value)}
//  />

//  <input
//  className="border p-2"
//  placeholder="Phone"
//  onChange={(e)=>setPhone(e.target.value)}
//  />

//  <input
//  className="border p-2"
//  placeholder="Vehicle"
//  onChange={(e)=>setVehicle(e.target.value)}
//  />

//  <input
//  className="border p-2"
//  placeholder="Resident ID"
//  onChange={(e)=>setResidentId(e.target.value)}
//  />

//  <button
//  onClick={createVisitor}
//  className="bg-blue-500 text-white px-4 py-2"
//  >
//  Add
//  </button>

//  </div>

//  <table className="w-full border">

//  <thead className="bg-gray-100">

//  <tr>
//  <th className="border p-2">Name</th>
//  <th className="border p-2">Phone</th>
//  <th className="border p-2">Vehicle</th>
//  <th className="border p-2">Resident ID</th>
//  <th className="border p-2">Action</th>
//  </tr>

//  </thead>

//  <tbody>

//  {visitors.map(v=>(
//  <tr key={v.id}>
//  <td className="border p-2">{v.name}</td>
//  <td className="border p-2">{v.phone}</td>
//  <td className="border p-2">{v.vehicle}</td>
//     <td className="border p-2">{v.residentId}</td>

//  <td className="border p-2">

//  <button
//  onClick={()=>deleteVisitor(v.id)}
//  className="bg-red-500 text-white px-3 py-1"
//  >
//  Delete
//  </button>

//  </td>

//  </tr>
//  ))}

//  </tbody>

//  </table>

//  </div>

//  )

// }

// export default Visitors