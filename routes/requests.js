const express = require("express");
const db = require("../db");

const router = express.Router();

// CREATE REQUEST
router.post("/", async (req, res) => {
  const { user_id, service_name, package_type, message } = req.body;

  try {
    await db.query(
      "INSERT INTO requests (user_id, service_name, package, message) VALUES ($1,$2,$3,$4)",
      [user_id, service_name, package_type, message]
    );

    res.json({ message: "Request sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER REQUESTS
router.get("/:user_id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM requests WHERE user_id=$1",
      [req.params.user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
