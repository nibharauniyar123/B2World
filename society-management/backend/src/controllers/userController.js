const prisma = require("../prisma/prismaClient")
const bcrypt = require("bcrypt")

// CREATE USER (Add member to society)
const createUser = async (req, res) => {

 try {

  const { name, email, password, role, societyId } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({

   data: {
    name,
    email,
    password: hashedPassword,
    role,
    societyId
   }

  })

  res.json({
   message: "User created",
   user
  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}
// GET ALL USERS
const getUsers = async (req, res) => {

 try {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const search = req.query.search || ""
  const role = req.query.role || ""
  const skip = (page - 1) * limit   

  const users = await prisma.user.findMany({

    where: {
        AND: [
            {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            
                role ?{  role } :{}
            
        ]
    },
    skip,
    take: limit
  })
  const totalUsers = await prisma.user.count()

  res.json({
    users,
    totalUsers,
    page,
    limit
  } )

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}
// REMOVE USER
const deleteUser = async (req, res) => {

 try {

  const id = parseInt(req.params.id)

  await prisma.user.delete({
   where: { id }
  })

  res.json({
   message: "User removed"
  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}


// CHANGE ROLE
const changeUserRole = async (req, res) => {

 try {

  const id = parseInt(req.params.id)
  const { role } = req.body

  const user = await prisma.user.update({

   where: { id },

   data: { role }

  })

  res.json({
   message: "Role updated",
   user
  })

 } catch (error) {

  res.status(500).json({
   error: error.message
  })

 }

}
const getMe = async (req, res) => {

 try {

  const user = req.user

  res.json(user)

 } catch (error) {

  res.status(500).json({ error: error.message })

 }

}


module.exports = {
 createUser,
 getUsers,
 deleteUser,
 changeUserRole ,
 getMe    
}