import { useEffect,useState } from "react";
import API from "../api/api";

export default function Maintenance(){

 const [bills,setBills] = useState([]);

 useEffect(()=>{
  loadBills();
 },[]);

 const loadBills = async()=>{
  const res = await API.get("/maintenance");
  setBills(res.data);
 }

 return(

  <div>

   <h2>Maintenance Bills</h2>

   <table border="1">

    <thead>
      <tr>
        <th>Month</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>

      {bills.map(b=>(
        <tr key={b.id}>
          <td>{b.month}</td>
          <td>{b.amount}</td>
          <td>{b.status}</td>
        </tr>
      ))}

    </tbody>

   </table>

  </div>

 )
}