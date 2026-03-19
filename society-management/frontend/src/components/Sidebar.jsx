import { Link } from "react-router-dom";

function Sidebar(){

 return(

  <div style={{width:"200px",background:"#222",color:"#fff",height:"100vh"}}>

   <h2 style={{padding:"20px"}}>Admin</h2>

   <ul style={{listStyle:"none"}}>

    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>

    <li>
      <Link to="/users">Users</Link>
    </li>

    <li>
      <Link to="/societies">Societies</Link>
    </li>

   </ul>

  </div>

 )

}

export default Sidebar