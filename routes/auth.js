const express = require("express");
const router = express.Router();


// Temporary storage (no MongoDB / mongoose)
let users = [];


// =======================
// REGISTER
// =======================
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;


    const existingUser = users.find(
        user => user.email === email
    );


    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }


    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };


    users.push(newUser);


    res.status(201).json({
        message: "Registration successful",
        user: {
            name,
            email
        }
    });

});



// =======================
// LOGIN
// =======================
router.post("/login", (req, res) => {

    const { email, password } = req.body;


    const user = users.find(
        u => u.email === email && u.password === password
    );


    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }


    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });

});


module.exports = router;
