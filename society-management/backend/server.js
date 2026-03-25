// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// import authRoutes from "./src/routes/authRoutes.js";
// import societyRoutes from "./src/routes/societyRoutes.js";
// import userRoutes  from "./src/routes/userRoutes.js";
// import  dashboardRoutes from "./src/routes/dashboardRoutes.js";
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/society", societyRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/dashboard", dashboardRoutes)
// app.get("/api", (_req, res) => {
//   res.send("Society Management API Running");
  
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(authRoutes);

// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import societyRoutes from "./src/routes/societyRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import complaintRoutes from "./src/routes/complaintRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/api", (_req, res) => {
  res.send("Society Management API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});