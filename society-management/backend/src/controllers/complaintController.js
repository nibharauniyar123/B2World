import prisma from "../config/prisma.js"

// CREATE COMPLAINT
export const createComplaint = async (req,res)=>{
 try{

  const { title, description, societyId } = req.body

  const complaint = await prisma.complaint.create({
   data:{
    title,
    description,
    status:"PENDING",

    user:{
     connect:{
      id:req.user.id
     }
    },

    society:{
     connect:{
      id:Number(societyId)
     }
    }

   }
  })

  res.json(complaint)

 }catch(error){
  res.status(500).json({error:error.message})
 }
}


// GET ALL COMPLAINTS
export const getComplaints = async (req,res)=>{
 try{

  const complaints = await prisma.complaint.findMany({
   include:{
    user:true,
    society:true
   }
  })

  res.json(complaints)

 }catch(error){
  res.status(500).json({error:error.message})
 }
}