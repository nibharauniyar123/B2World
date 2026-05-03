import jwt from "jsonwebtoken";

// ==============================
// 🔐 PROTECT ROUTE (VERIFY TOKEN)
// ==============================
export const protect = (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ==============================
// 👑 ADMIN ONLY ACCESS
// ==============================
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Role check failed",
    });
  }
};

// ==============================
// 👤 USER OR ADMIN ACCESS
// ==============================
export const isUserOrAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.user.role === "USER" || req.user.role === "ADMIN") {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access check failed",
    });
  }
};