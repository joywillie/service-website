const express = require("express");
const router = express.Router();

// Temporary in-memory storage (no database)
let services = [
  {
    id: 1,
    name: "Web Design",
    description: "Professional website design services",
    price: 1000
  },
  {
    id: 2,
    name: "App Development",
    description: "Mobile app development for Android & iOS",
    price: 5000
  }
];

// =======================
// GET ALL SERVICES
// =======================
router.get("/", (req, res) => {
  res.json({
    message: "Services fetched successfully",
    data: services
  });
});

// =======================
// GET SINGLE SERVICE
// =======================
router.get("/:id", (req, res) => {
  const service = services.find(
    s => s.id === parseInt(req.params.id)
  );

  if (!service) {
    return res.status(404).json({
      message: "Service not found"
    });
  }

  res.json(service);
});

// =======================
// ADD NEW SERVICE
// =======================
router.post("/", (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and price are required"
    });
  }

  const newService = {
    id: Date.now(),
    name,
    description: description || "",
    price
  };

  services.push(newService);

  res.status(201).json({
    message: "Service created successfully",
    data: newService
  });
});

// =======================
// DELETE SERVICE
// =======================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = services.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Service not found"
    });
  }

  const deleted = services.splice(index, 1);

  res.json({
    message: "Service deleted successfully",
    data: deleted[0]
  });
});

module.exports = router;
