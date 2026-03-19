const prisma = require("../prisma/prismaClient")

const getDashboardStats = async (req, res) => {

 try {

  const totalUsers = await prisma.user.count()
  const totalSocieties = await prisma.society.count()

  res.json({

   totalUsers,
   totalSocieties

  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}

module.exports = {
 getDashboardStats
}