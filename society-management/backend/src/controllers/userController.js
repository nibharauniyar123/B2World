import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // societyId: 1,
        role: role || "USER",   // ✅ FIXED
      },
    });

    res.status(201).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany()
    //   where:
    //     societyId:1
    //   }
    // })

    res.json(users)

  } catch (error) {
    console.log("GET USERS ERROR:", error)
    res.status(500).json({ error: error.message })
  }
}
// DELETE USER
// export const deleteUser = async (req, res) => {
//   try {
//     const id = req.params.id;

//     await prisma.user.delete({
//       where: { id },
//     });

//     res.json({ message: "User removed" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log("Delete User Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};
// CHANGE ROLE
export const changeUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    res.json({ message: "Role updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};