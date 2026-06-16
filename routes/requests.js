const express = require("express");
const router = express.Router();

// Temporary in-memory storage (no database)
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
// GET SINGLE REQUEST
// =======================
router.get("/:id", (req, res) => {
  const request = requests.find(
    r => r.id === parseInt(req.params.id)
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  res.json(request);
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
// UPDATE REQUEST STATUS
// =======================
router.put("/:id", (req, res) => {
  const request = requests.find(
    r => r.id === parseInt(req.params.id)
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  request.status = req.body.status || request.status;

  res.json({
    message: "Request updated successfully",
    data: request
  });
});

// =======================
// DELETE REQUEST
// =======================
router.delete("/:id", (req, res) => {
  const index = requests.findIndex(
    r => r.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  const deleted = requests.splice(index, 1);

  res.json({
    message: "Request deleted successfully",
    data: deleted[0]
  });
});

module.exports = router;
