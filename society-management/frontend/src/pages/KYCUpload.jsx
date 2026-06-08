import { useState } from "react";
import axios from "axios";

const KYCUpload = ()=>{

  const [file,setFile] = useState();

  const submit = async()=>{

    const formData = new FormData();

    formData.append("citizenship",file);

    formData.append("userId",1);

    // await axios.post(
    //   "http://localhost:5000/api/kyc",
    //   formData
      axios.post(
  "http://localhost:5000/api/kyc/upload",
  formData
);
   

    alert("Uploaded");

  };

  return(

    <div>

      <h2>KYC Upload</h2>

      <input
        type="file"
        onChange={(e)=>
          setFile(e.target.files[0])
        }
      />

      <button onClick={submit}>
        Upload
      </button>

    </div>

  );

};

export default KYCUpload;