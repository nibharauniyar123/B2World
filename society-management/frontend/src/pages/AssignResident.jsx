import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AssignResident() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [flat,setFlat]=useState(null);
  const [resident, setResident] = useState("");

  useEffect(()=>{

    getFlat();

  },[]);

  const getFlat=async()=>{

    const res=await axios.get(
      `http://localhost:5000/api/flats/${id}`
    );

    setFlat(res.data);

  }
const assignResident = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/flats/${id}/assign`,
      {
        ownerName: resident,
      }
    );

    alert("Resident Assigned Successfully");

    navigate("/flats");

  } catch (error) {
    alert("Assignment Failed");
    console.log(error);
  }
};
  if(!flat){

    return <h2>Loading...</h2>

  }

  return(

<div>

<h2>Assign Resident</h2>

<p>Flat : {flat.flatNo}</p>

<p>Block : {flat.block}</p>

<p>Owner : {flat.ownerName}</p>
<input
  type="text"
  placeholder="Resident Name"
  value={resident}
  onChange={(e) => setResident(e.target.value)}
/>

<br /><br />

<button onClick={assignResident}>
  Assign Resident
</button>

</div>

)

}

export default AssignResident;