import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

function FlatDetails() {

const { id } = useParams();

const [flat,setFlat]=useState(null);

useEffect(()=>{

fetchFlat();

},[]);

const fetchFlat=async()=>{

const res=await axios.get(`/api/flats/${id}`);

setFlat(res.data);

};

if(!flat){

return <h2>Loading...</h2>

}

return(

<div style={{padding:"40px"}}>

<h1>Flat Details</h1>

<hr/>

<h3>Block : {flat.block}</h3>

<h3>Flat No : {flat.flatNo}</h3>

<h3>Floor : {flat.floor}</h3>

<h3>Owner : {flat.ownerName}</h3>

<h3>Status : {flat.occupancyStatus}</h3>

<h3>Society : {flat.society?.name}</h3>

</div>

)

}

export default FlatDetails;