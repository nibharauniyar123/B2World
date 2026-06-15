// // 
// import prisma from "../prisma/prismaClient.js";
// import bcrypt from "bcryptjs";

// export const createUser = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         role: role.toUpperCase(),
//       },
//       include: { flat: true }   // Helpful for complaints dropdown
//     });

//     console.log("USER CREATED:", user);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error("CREATE USER ERROR:", error);
//     res.status(500).json({
//       message: "Create failed",
//       error: error.message,
//     });
//   }
// };

// export const getUsers = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       include: { 
//         flat: true   // Important for showing Flat Number in dropdown
//       },
//       orderBy: { createdAt: "desc" }
//     });

//     console.log(`✅ Fetched ${users.length} users`);
//     res.json({ users });        // ← This format is important for frontend
//   } catch (error) {
//     console.error("GET USERS ERROR:", error);
//     res.status(500).json({ 
//       error: "Failed to fetch users",
//       message: error.message 
//     });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     await prisma.user.delete({ where: { id } });
//     res.json({ success: true, message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Delete User Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Bonus: Get users by role (useful for complaints)
// export const getUsersByRole = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const users = await prisma.user.findMany({
//       where: role ? { role: role.toUpperCase() } : {},
//       include: { flat: true }
//     });
//     res.json({ users });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
  
      orderBy: { createdAt: "desc" }
    });

    console.log(`✅ Fetched ${users.length} users`);
    res.json({ users });        // ← Very Important: Return as { users: [...] }
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};