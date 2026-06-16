const express = require("express");
const db = require("../db");

const router = express.Router();

// GET ALL SERVICES
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM services");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
