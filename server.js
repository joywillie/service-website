const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");
const requestRoutes = require("./routes/requests");

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// API ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);

// =======================
// HOME ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("🚀 Service Backend is Running Successfully!");
});

// =======================
// HEALTH CHECK ROUTE
// =======================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is live",
    time: new Date()
  });
});

// =======================
// PORT CONFIG (RENDER FIX)
// =======================
const PORT = process.env.PORT || 5000;

// IMPORTANT: bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
