require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const uploadRoutes = require("./routes/upload");
const contactRoutes = require("./routes/contact");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// serve uploaded images publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    res.json({ ok: true, db: rows[0].test === 1 });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
