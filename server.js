const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");
const requestRoutes = require("./routes/requests");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);

// 🔥 HOME ROUTE (Fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Service Backend is Running Successfully!");
});

// 🔥 Health check route (optional but useful)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is live",
    time: new Date()
  });
});

// PORT (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
