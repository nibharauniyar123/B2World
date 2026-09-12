
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

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
import notificationRoutes from "./src/routes/notificationRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import vendorRoutes from "./src/routes/vendorRoutes.js";
import expenseRoutes from "./src/routes/expenseRoutes.js";
import parkingRoutes from "./src/routes/parkingRoutes.js";
import kycRoutes from "./src/routes/kycRoutes.js";
import superAdminRoutes from "./src/routes/superAdminRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static("uploads"));
// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is working"
  });
});
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/super-admin", superAdminRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Society Management API is Running 🚀");
});

app.get("/api", (req, res) => {
  res.send("Society Management API is Running 🚀");
});

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});