function Navbar(){

 const logout = ()=>{
  localStorage.removeItem("token")
  window.location.href="/"
 }

 return(

  <div style={{
   background:"#eee",
   padding:"15px",
   display:"flex",
   justifyContent:"space-between"
  }}>

   <h3>Society Admin Dashboard</h3>

   <button onClick={logout}>
    Logout
   </button>

  </div>

 )

}

export default Navbar