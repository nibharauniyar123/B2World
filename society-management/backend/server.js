const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes.js");
const societyRoutes = require("./src/routes/societyRoutes")
const userRoutes = require("./src/routes/userRoutes")
const dashboardRoutes = require("./src/routes/dashboardRoutes")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/society", societyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes)
app.get("/", (req, res) => {
  res.send("Society Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
