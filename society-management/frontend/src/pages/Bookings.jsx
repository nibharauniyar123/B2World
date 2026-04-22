import { useEffect,useState } from "react";
import API from "../api/api";

export default function Bookings(){

 const [bookings,setBookings] = useState([]);

 useEffect(()=>{
  loadBookings();
 },[]);

 const loadBookings = async()=>{
  const res = await API.get("/bookings");
  setBookings(res.data);
 }

 return(

  <div>

   <h2>Bookings</h2>

   <table border="1">

    <thead>
      <tr>
        <th>Amenity</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>

      {bookings.map(b=>(
        <tr key={b.id}>
          <td>{b.amenity}</td>
          <td>{b.date}</td>
          <td>{b.status}</td>
        </tr>
      ))}

    </tbody>

   </table>

  </div>

 )
}

