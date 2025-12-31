const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
const MONGO_URI=process.env.MONGO_URI;


const authRoutes = require("./routes/auth");
const resRoutes = require("./routes/resolution");

// --- CONNECT TO DATABASE ---
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB connection error:", err));

// --- MIDDLEWARE ---
//app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://new-resolution-client.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());

// --- TEST ROUTE ---
app.post("/api/save", (req, res) => {
  console.log("User:", req.body.name);
  res.json({ success: true });
});

// --- FEATURE ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/resolution", resRoutes);

// --- START SERVER ---
app.listen(5000, () => console.log("Server running on port 5000"));
