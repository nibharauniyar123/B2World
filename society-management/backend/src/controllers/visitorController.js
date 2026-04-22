import prisma from "../prisma/prismaClient.js";

export const createVisitor = async(req,res)=>{
 const {name,phone,vehicle,residentId}=req.body;

 const visitor = await prisma.visitor.create({
  data:{
   name,
   phone,
   vehicle,
   residentId
  }
 });

 res.json(visitor);
};

export const getVisitors = async(req,res)=>{
 const visitors = await prisma.visitor.findMany();

 res.json(visitors);
};