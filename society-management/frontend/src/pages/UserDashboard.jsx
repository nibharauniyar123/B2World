

// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function UserDashboard(){

//  const [user,setUser] = useState(null);
//  const [societies,setSocieties] = useState([]);

//  useEffect(()=>{

//   const fetchData = async()=>{

//    try{

//     const res = await API.get("/users/me");
//     setUser(res.data);

//     const soc = await API.get("/society");
//     setSocieties(soc.data);

//    }catch(err){
//     console.log(err);
//    }

//   }

//   fetchData();

//  },[]);

//  const joinSociety = async(id)=>{
//   alert("Join feature next step ")
//  }

//  return(

//   <div style={{padding:"30px"}}>

//    <h1>User Dashboard</h1>

//    {/* USER CARD */}
//    {user && (
//     <div style={{
//       border:"1px solid gray",
//       padding:"15px",
//       marginBottom:"20px"
//     }}>
//      <h3>Profile</h3>
//      <p>Name: {user.name}</p>
//      <p>Email: {user.email}</p>
//      <p>Role: {user.role}</p>
//     </div>
//    )}

//    {/* SOCIETY LIST */}
//    <h2>Available Societies</h2>

//    {societies.length === 0 && (
//     <p>No societies available</p>
//    )}

//    <div>

//     {societies.map((s)=>(
//      <div key={s.id} style={{
//       border:"1px solid black",
//       padding:"10px",
//       marginBottom:"10px"
//      }}>

//       <h3>{s.name}</h3>

//       <button onClick={()=>joinSociety(s.id)}>
//        Join
//       </button>

//      </div>
//     ))}

//    </div>

//   </div>

//  )

// }

// export default UserDashboard;

import { useEffect, useState } from "react";
import API from "../api/axios";

function UserDashboard() {

  const [user, setUser] = useState(null);
  const [societies, setSocieties] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchData = async () => {

      try {

        // USER
        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);

        // SOCIETIES
        const soc = await API.get("/society", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSocieties(soc.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchData();

  }, []);

  // JOIN FUNCTION
  const joinSociety = async (id) => {
    try {

      await API.post(`/society/join/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Joined successfully ✅");

    } catch (err) {
      alert("Join failed ❌");
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>User Dashboard</h1>

      {/* USER PROFILE */}
      {user && (
        <div style={{
          border: "1px solid gray",
          padding: "15px",
          marginBottom: "20px"
        }}>
          <h3>Profile</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      {/* SOCIETIES */}
      <h2>Available Societies</h2>

      {societies.length === 0 ? (
        <p>No societies available</p>
      ) : (
        societies.map((s) => (
          <div key={s.id} style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}>

            <h3>{s.name}</h3>

            <button onClick={() => joinSociety(s.id)}>
              Join
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default UserDashboard;

