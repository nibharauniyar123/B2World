import prisma from "../config/prisma.js"

export const createBooking = async (req,res)=>{
 try{

  const { amenity, date, slot, userId } = req.body

  const booking = await prisma.booking.create({
   data:{
    amenity,
    date:new Date(date),    
    slot,
    userId,
    status: "pending"
   }
  })

  res.json(booking)

 }catch(error){
  res.status(500).json({error:error.message})
 }
}

export const getBookings = async (req,res)=>{
 try{

  const bookings = await prisma.booking.findMany()

  res.json(bookings)

 }catch(error){
  res.status(500).json({error:error.message})
 }
}