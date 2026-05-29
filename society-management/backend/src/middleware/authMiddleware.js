import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";


// PROTECT ROUTE
export const protect = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // get token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    // no token
    if (!token) {

      return res.status(401).json({
        message: "No token provided",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // find user
    const user =
      await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

    if (!user) {

      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Unauthorized",
    });
  }
};




// ADMIN CHECK
export const isAdmin = (
  req,
  res,
  next
) => {

  if (
    req.user.role !== "RESIDENT"
  ) {

    return res.status(403).json({
      message: "Admin only access",
    });
  }

  next();
};




// DEFAULT EXPORT
export default protect;