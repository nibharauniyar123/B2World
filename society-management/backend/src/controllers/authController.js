import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    console.log(req.body);

    // check existing user
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // create user
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,

          // IMPORTANT
          role: "RESIDENT",
    
        },
      });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(
      "REGISTER ERROR:"
    );

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log(email, password);

    // find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log(user);

    // no user
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {

    console.log("LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate Reset Token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Create Reset Link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log("Reset Link:", resetLink);

    // Send Email
    await sendResetEmail(user.email, resetLink);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send reset link.",
      error: error.message,
    });
  }
};