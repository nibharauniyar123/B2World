

// import { useEffect, useState } from "react"
// import API from "../api/axios"

// function Notices(){

//  const [notices,setNotices] = useState([])
//  const [title,setTitle] = useState("")
//  const [message,setMessage] = useState("")

//  const fetchNotices = async ()=>{
//   const res = await API.get("/notices")
//   setNotices(res.data)
//  }

//  useEffect(()=>{
//   fetchNotices()
//  },[])

//  const createNotice = async()=>{

//   await API.post("/notices",{
//    title,
//    message,
//    societyId:1
//   })

//   setTitle("")
//   setMessage("")

//   fetchNotices()
//  }

//  return(

//   <div style={{padding:"20px"}}>

//    <h2 style={{marginBottom:"20px"}}>Notices</h2>

//    {/* Form */}

//    <div style={{
//     border:"1px solid #ccc",
//     padding:"15px",
//     borderRadius:"6px",
//     marginBottom:"20px",
//     display:"flex",
//     gap:"10px"
//    }}>

//     <input
//      placeholder="Title"
//      value={title}
//      onChange={(e)=>setTitle(e.target.value)}
//      style={{
//       padding:"8px",
//       border:"1px solid #ccc",
//       borderRadius:"4px"
//      }}
//     />

//     <input
//      placeholder="Message"
//      value={message}
//      onChange={(e)=>setMessage(e.target.value)}
//      style={{
//       padding:"8px",
//       border:"1px solid #ccc",
//       borderRadius:"4px",
//       width:"300px"
//      }}
//     />

//     <button
//      onClick={createNotice}
//      style={{
//       background:"#2563eb",
//       color:"white",
//       border:"none",
//       padding:"8px 15px",
//       borderRadius:"4px",
//       cursor:"pointer"
//      }}
//     >
//      Create
//     </button>

//    </div>


//    {/* Notices Table */}

//    <table style={{
//     width:"100%",
//     borderCollapse:"collapse"
//    }}>

//     <thead>

//      <tr style={{background:"#f3f4f6"}}>

//       <th style={{border:"1px solid #ccc",padding:"10px"}}>
//        Title
//       </th>

//       <th style={{border:"1px solid #ccc",padding:"10px"}}>
//        Message
//       </th>

//      </tr>

//     </thead>

//     <tbody>

//      {notices.map(n=>(
//       <tr key={n.id}>

//        <td style={{border:"1px solid #ccc",padding:"10px"}}>
//         {n.title}
//        </td>

//        <td style={{border:"1px solid #ccc",padding:"10px"}}>
//         {n.message}
//        </td>

//       </tr>
//      ))}

//     </tbody>

//    </table>

//   </div>

//  )
// }

// export default Notices
import { useEffect, useState } from "react"
import API from "../api/axios"

function Notices(){

 const [notices,setNotices] = useState([])
 const [title,setTitle] = useState("")
 const [message,setMessage] = useState("")
 const [loading,setLoading] = useState(false)

 const fetchNotices = async ()=>{

  try{
   const res = await API.get("/notices")

  console.log("API DATA:", res.data) 
   setNotices(res.data)
  }catch(err){
   console.error(err)
  }

 }

 useEffect(()=>{
  fetchNotices()
 },[])

 const createNotice = async()=>{

  if(!title || !message){
   alert("Please fill all fields")
   return
  }

  try{

   setLoading(true)

   await API.post("/notices",{
    title,
    message,
    societyId:1
   })

   setTitle("")
   setMessage("")

   fetchNotices()

  }catch(err){
   console.error(err)
  }finally{
   setLoading(false)
  }

 }

 const deleteNotice = async(id)=>{

  try{

   await API.delete(`/notices/${id}`)
   fetchNotices()

  }catch(err){
   console.error(err)
  }

 }

 return(

  <div style={{padding:"20px"}}>

   <h2 style={{marginBottom:"20px"}}>
    Notices
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
     placeholder="Title"
     value={title}
     onChange={(e)=>setTitle(e.target.value)}
     style={{
      padding:"8px",
      border:"1px solid #ccc",
      borderRadius:"4px"
     }}
    />

    <input
     placeholder="Message"
     value={message}
     onChange={(e)=>setMessage(e.target.value)}
     style={{
      padding:"8px",
      border:"1px solid #ccc",
      borderRadius:"4px",
      width:"300px"
     }}
    />

    <button
     onClick={createNotice}
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

   {/* Notices Table */}

   <table style={{
    width:"100%",
    borderCollapse:"collapse"
   }}>

    <thead>

     <tr style={{background:"#f3f4f6"}}>

      <th style={{border:"1px solid #ccc",padding:"10px"}}>
       Title
      </th>

      <th style={{border:"1px solid #ccc",padding:"10px"}}>
       Message
      </th>

      <th style={{border:"1px solid #ccc",padding:"10px"}}>
       Action
      </th>

     </tr>

    </thead>

    <tbody>

     {notices.length === 0 ? (

      <tr>
       <td colSpan="3" style={{padding:"15px",textAlign:"center"}}>
        No notices found
       </td>
      </tr>

     ) : (

      notices.map(n=>(

       <tr key={n.id}>

        <td style={{border:"1px solid #ccc",padding:"10px"}}>
         {n.title}
        </td>

        <td style={{border:"1px solid #ccc",padding:"10px"}}>
         {n.message}
        </td>

        <td style={{border:"1px solid #ccc",padding:"10px"}}>

         <button
          onClick={()=>deleteNotice(n.id)}
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

export default Notices