const express = require("express");
const router = express.Router();

// Temporary in-memory storage
let requests = [];

// =======================
// GET ALL REQUESTS
// =======================
router.get("/", (req, res) => {
  res.json({
    message: "Requests fetched successfully",
    data: requests
  });
});

// =======================
// CREATE REQUEST
// =======================
router.post("/", (req, res) => {
  const { name, service, message } = req.body;

  if (!name || !service) {
    return res.status(400).json({
      message: "Name and service are required"
    });
  }

  const newRequest = {
    id: Date.now(),
    name,
    service,
    message: message || "",
    status: "pending",
    createdAt: new Date()
  };

  requests.push(newRequest);

  res.status(201).json({
    message: "Request created successfully",
    data: newRequest
  });
});

// =======================
// DELETE REQUEST
// =======================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = requests.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  const deleted = requests.splice(index, 1);

  res.json({
    message: "Request deleted",
    data: deleted[0]
  });
});

module.exports = router;
