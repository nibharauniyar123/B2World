import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password ,role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER",
      },
    });

    res.json({
      message: "User registered",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        //societyId: user.societyId,
      },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};