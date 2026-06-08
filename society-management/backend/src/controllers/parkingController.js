import prisma from "../config/prisma.js";

export const getParkingSlots = async(req,res)=>{

  const slots = await prisma.parkingSlot.findMany();

  res.json(slots);
};

export const createParkingSlot = async(req,res)=>{

  const { slotNumber } = req.body;

  const slot = await prisma.parkingSlot.create({
    data:{
      slotNumber
    }
  });

  res.json(slot);
};