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
// SERVE FRONTEND (IMPORTANT)
// =======================
app.use(express.static("public"));

// =======================
// API ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);

// =======================
// HOME PAGE (FRONTEND)
// =======================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================
// HEALTH CHECK (FOR RENDER)
// =======================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Service Backend is Running Successfully!",
    time: new Date()
  });
});

// =======================
// PORT (RENDER FIX)
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
