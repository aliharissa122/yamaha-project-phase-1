const express = require("express");
const db = require("../db");
const { authRequired, adminOnly } = require("../middleware/auth");

const router = express.Router();

/**
 * PUBLIC: submit contact form
 * POST /api/contact
 */
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email, message are required" });
    }

    const [result] = await db.query(
      "INSERT INTO contact_messages (name, phone, email, message) VALUES (?, ?, ?, ?)",
      [name.trim(), (phone || "").trim(), email.trim(), message.trim()]
    );

    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN: list messages
 * GET /api/contact
 */
router.get("/", authRequired, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, phone, email, message, created_at FROM contact_messages ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN: delete one message (optional)
 * DELETE /api/contact/:id
 */
router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM contact_messages WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
