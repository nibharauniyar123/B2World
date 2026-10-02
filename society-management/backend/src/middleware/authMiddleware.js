
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";

// ===============================
// PROTECT ROUTE
// ===============================
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED TOKEN:", decoded);

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    console.log("AUTHENTICATED USER:", {
      id: user.id,
      email: user.email,
      role: user.role,
      societyId: user.societyId,
    });

    next();

  } catch (error) {
    console.error("AUTHENTICATION ERROR:", error);

    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};


// ===============================
// ADMIN CHECK
// ===============================
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Admin only access",
      });
    }

    next();

  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);

    return res.status(500).json({
      message: "Authorization failed",
    });
  }
};


// ===============================
// SUPER ADMIN ONLY
// ===============================
export const superAdminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Super Admin access required",
      });
    }

    next();

  } catch (error) {
    console.error("SUPER ADMIN AUTH ERROR:", error);

    return res.status(500).json({
      message: "Authorization failed",
    });
  }
};


// ===============================
// DEFAULT EXPORT
// ===============================
export default protect;