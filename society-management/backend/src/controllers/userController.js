import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        societyId: req.user.societyId, // ✅ SaaS FIX
      },
    });

    res.json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USERS (pagination + search + role + SaaS)
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const role = req.query.role || "";

    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      where: {
        societyId: req.user.societyId, // ✅ IMPORTANT
        name: {
          contains: search,
          mode: "insensitive",
        },
        ...(role && { role }),
      },
      skip,
      take: limit,
    });

    const totalUsers = await prisma.user.count({
      where: {
        societyId: req.user.societyId,
      },
    });

    res.json({ users, totalUsers, page, limit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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