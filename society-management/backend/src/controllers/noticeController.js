
import prisma from "../config/prisma.js"

export const createNotice = async (req,res)=>{
 try{

  const { title, message } = req.body

  const notice = await prisma.notice.create({
   data:{
    title,
    message,
        societyId: 1
   }
  })

  res.json(notice)

 }catch(error){
  res.status(500).json({error:error.message})
 }
}

export const getNotices = async (req,res)=>{
 try{

  const notices = await prisma.notice.findMany()

  res.json(notices)

 }catch(error){
  res.status(500).json({error:error.message})
 }
}
export const deleteNotice = async (req,res)=>{

 try{

  const {id} = req.params

  await prisma.notice.delete({
   where:{
    id:Number(id)
   }
  })

  res.json({message:"Notice deleted"})

 }catch(err){
  res.status(500).json({error:err.message})
 }

}