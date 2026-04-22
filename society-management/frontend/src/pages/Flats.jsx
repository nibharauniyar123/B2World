import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Flats(){

 const [flats,setFlats] = useState([])
 const [flatNo,setFlatNo] = useState("")
 const [block,setBlock] = useState("")
 const [societyId,setSocietyId] = useState("")

 const loadFlats = async()=>{

  const res = await API.get("/flats")

  setFlats(res.data)

 }

 useEffect(()=>{
  loadFlats()
 },[])

 const createFlat = async()=>{

  await API.post("/flats",{
   flatNo,
   block,
   societyId:Number(societyId)
  })

  setFlatNo("")
  setBlock("")
  setSocietyId("")

  loadFlats()

 }

 return(

  <div style={{padding:"20px"}}>

   <h2>Flats</h2>

   <div style={{marginBottom:"20px"}}>

    <input
     placeholder="Flat Number"
     value={flatNo}
     onChange={(e)=>setFlatNo(e.target.value)}
    />

    <input
     placeholder="Block"
     value={block}
     onChange={(e)=>setBlock(e.target.value)}
    />

    <input
     placeholder="Society ID"
     value={societyId}
     onChange={(e)=>setSocietyId(e.target.value)}
    />

    <button onClick={createFlat}>
     Create
    </button>

   </div>

   <table border="1">

    <thead>

     <tr>
      <th>ID</th>
      <th>Flat No</th>
      <th>Block</th>
      <th>Society</th>
     </tr>

    </thead>

    <tbody>

     {flats.map((f)=>(
      <tr key={f.id}>
       <td>{f.id}</td>
       <td>{f.flatNo}</td>
       <td>{f.block}</td>
       <td>{f.societyId}</td>
      </tr>
     ))}

    </tbody>

   </table>

  </div>

 )

}