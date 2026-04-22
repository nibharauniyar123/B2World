import prisma from "../prisma/prismaClient.js";

export const createMaintenance = async(req,res)=>{
 const {amount,month,userId}=req.body;

 const maintenance = await prisma.maintenance.create({
  data:{amount,month,userId,status:"PENDING"}
 });

 res.json(maintenance);
};

export const getMaintenance = async(req,res)=>{
 const data = await prisma.maintenance.findMany();

 res.json(data);
};