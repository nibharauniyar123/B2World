// import { BarChart, Bar, XAxis, YAxis } from "recharts"

// function Card({ title, value, data }) {

//  return (

//   <div>

//    <div className="bg-white p-6 rounded shadow">

//     <h3 className="text-gray-500">
//      {title}
//     </h3>

//     <p className="text-2xl font-bold">
//      {value}
//     </p>

//    </div>

//    <BarChart width={500} height={300} data={data}>
//     <XAxis dataKey="name"/>
//     <YAxis/>
//     <Bar dataKey="value" fill="#8884d8"/>
//    </BarChart>

//   </div>

//  )

// }

// export default Card
function Card({title,value}){

 return(

  <div style={{
   background:"white",
   padding:"20px",
   borderRadius:"8px",
   boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
  }}>

   <h4>{title}</h4>

   <h2>{value}</h2>

  </div>

 )

}

export default Card