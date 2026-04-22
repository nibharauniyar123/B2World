
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import societyRoutes from "./src/routes/societyRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import complaintRoutes from "./src/routes/complaintRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import flatRoutes from "./src/routes/flatRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import maintenanceRoutes from "./src/routes/maintenanceRoutes.js";
import noticeRoutes from "./src/routes/noticeRoutes.js";  
import visitorRoutes from "./src/routes/visitorRoutes.js";

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
app.use("/api/admin", adminRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/visitors", visitorRoutes);


app.get("/api", (_req, res) => {
  res.send("Society Management API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
