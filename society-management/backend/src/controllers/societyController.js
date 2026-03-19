const prisma = require("../prisma/prismaClient")

// CREATE SOCIETY
const createSociety = async (req, res) => {

 try {

  const { name } = req.body

  const society = await prisma.society.create({
   data: {
    name
   }
  })

  res.json({
   message: "Society created",
   society
  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}


// GET ALL SOCIETIES
const getSocieties = async (req, res) => {

 try {

  const societies = await prisma.society.findMany()

  res.json(societies)

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}


// UPDATE SOCIETY
const updateSociety = async (req, res) => {

 try {

  const id = parseInt(req.params.id)
  const { name } = req.body

  const society = await prisma.society.update({

   where: { id },

   data: { name }

  })

  res.json({
   message: "Society updated",
   society
  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}


// DELETE SOCIETY
const deleteSociety = async (req, res) => {

 try {

  const id = parseInt(req.params.id);
  await prisma.user.deleteMany({

   where: { societyId: id } 
  });

  await prisma.society.delete({

   where: { id }

  })

  res.json({
   message: "Society deleted"
  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}

// GET USERS OF A SOCIETY
const getSocietyUsers = async (req, res) => {

 try {

  const societyId = parseInt(req.params.id)

  const users = await prisma.user.findMany({

   where: {
    societyId: societyId
   },

   select: {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true
   }

  })

  res.json(users)

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}



// JOIN SOCIETY
const joinSociety = async (req, res) => {

 try {

  const userId = req.user.id
  const societyId = parseInt(req.params.id)

  // 1️⃣ check society exists
  const society = await prisma.society.findUnique({
    where: { id: societyId }
  })

  if (!society) {
    return res.status(404).json({
      message: "Society not found"
    })
  }

  // 2️⃣ update user (join society)
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      societyId: societyId
    }
  })

  res.json({
    message: "Joined society successfully",
    user: updatedUser
  })

 } catch (error) {

  res.status(500).json({
    error: error.message
  })

 }

}


module.exports = {

 createSociety,
 getSocieties,
 updateSociety,
 deleteSociety,
 getSocietyUsers,
    joinSociety

}