// import prisma from "../prisma/prismaClient.js";

// // CREATE
// export const createSociety = async (req, res) => {
//   try {
//     const { name, address } = req.body;

//     const society = await prisma.society.create({
//       data: { name, address },
//     });

//     res.json({ message: "Society created", society });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // GET
// export const getSocieties = async (req, res) => {
//   try {
//     const societies = await prisma.society.findMany();
//     res.json(societies);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // UPDATE
// export const updateSociety = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const society = await prisma.society.update({
//       where: { id },
//       data: req.body,
//     });

//     res.json({ message: "Society updated", society });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // DELETE ✅ FIXED
// export const deleteSociety = async (req, res) => {
//   try {
//     const id = req.params.id;

//     await prisma.society.delete({
//       where: { id },
//     });

//     res.json({ message: "Society deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // GET USERS
// export const getSocietyUsers = async (req, res) => {
//   try {
    
//     const societyId = parseInt(req.params.id)

//     const users = await prisma.user.findMany({
//       where: { societyId },
//     });

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // JOIN
// export const joinSociety = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const societyId = Number(req.params.id); // Convert to number if needed

//     console.log("ID TYPE:", typeof societyId); // Check the type of societyId

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { societyId },
//     });

//     res.json({ message: "Joined", user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

import prisma from "../prisma/prismaClient.js";

export const createSociety = async (req,res)=>{
 try{
   const {name,address,city} = req.body;

   const society = await prisma.society.create({
     data:{name,address,city}
   });

   res.json(society);
 }catch(err){
   res.status(500).json({error:err.message})
 }
}

export const getSocieties = async(req,res)=>{
 const societies = await prisma.society.findMany();
 res.json(societies);
}
