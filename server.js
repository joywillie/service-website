const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE (NEON POSTGRESQL) ================= */
const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: {
rejectUnauthorized: false
}
});

/* ================= AUTO CREATE TABLE ================= */
const createTableQuery = `
CREATE TABLE IF NOT EXISTS requests (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
service TEXT NOT NULL,
message TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createTableQuery)
.then(() => console.log("Database table ready ✅"))
.catch(err => console.error("Table creation error ❌", err));

/* ================= ROUTES ================= */

/* HOME TEST */
app.get("/", (req, res) => {
res.send("JoyTech Server Running 🚀");
});

/* SAVE REQUEST */
app.post("/api/request", async (req, res) => {
try {
const { name, service, message } = req.body;

if (!name || !service || !message) {
return res.status(400).json({
success: false,
message: "All fields are required ❌"
});
}

await pool.query(
"INSERT INTO requests (name, service, message) VALUES ($1, $2, $3)",
[name, service, message]
);

res.json({
success: true,
message: "Request saved successfully 🚀"
});

} catch (error) {
console.error(error);
res.status(500).json({
success: false,
message: "Server error ❌"
});
}
});

/* GET ALL REQUESTS (ADMIN DASHBOARD) */
app.get("/api/requests", async (req, res) => {
try {
const result = await pool.query(
"SELECT * FROM requests ORDER BY id DESC"
);

res.json(result.rows);

} catch (error) {
console.error(error);
res.status(500).json({
success: false,
message: "Failed to fetch requests ❌"
});
}
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT} 🚀`);
});
