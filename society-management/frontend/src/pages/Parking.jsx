import { useEffect,useState } from "react";
import axios from "axios";

const Parking = ()=>{

  const [slots,setSlots] = useState([]);

  useEffect(()=>{

    fetchSlots();

  },[]);

  const fetchSlots = async()=>{

    const res = await axios.get(
      "http://localhost:5000/api/parking"
    );

    setSlots(res.data);
  };

  return(
    <div>

      <h1>Parking Slots</h1>

      <table>

        <thead>
          <tr>
            <th>Slot</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {slots.map(slot=>(
            <tr key={slot.id}>
              <td>{slot.slotNumber}</td>
              <td>{slot.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Parking;