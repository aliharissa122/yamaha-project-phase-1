const express = require("express");
const db = require("../db");
const { authRequired, adminOnly } = require("../middleware/auth");

const router = express.Router();

/**
 * PUBLIC: Get all products (+ optional search + optional category)
 * GET /api/products?search=mt&category=bike
 */
router.get("/", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const category = (req.query.category || "").trim();

    let sql = "SELECT * FROM products";
    const params = [];
    const conditions = [];

    if (category) {
      conditions.push("category = ?");
      params.push(category);
    }

    if (search) {
      conditions.push("(name LIKE ? OR description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY created_at DESC";

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUBLIC: Get one product
 * GET /api/products/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN: Create product
 * POST /api/products
 */
router.post("/", authRequired, adminOnly, async (req, res) => {
  try {
    const { name, description, price, image_url, category } = req.body;

    if (!name || price == null || !category) {
      return res
        .status(400)
        .json({ message: "name, price, category are required" });
    }

    const [result] = await db.query(
      `INSERT INTO products (name, description, price, image_url, category)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description || "", price, image_url || "", category]
    );

    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN: Update product
 * PUT /api/products/:id
 */
router.put("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    const { name, description, price, image_url, category } = req.body;

    // Ensure product exists
    const [exists] = await db.query("SELECT id FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (exists.length === 0) return res.status(404).json({ message: "Not found" });

    // Update (keep fields as provided; allow partial updates)
    const fields = [];
    const params = [];

    if (name !== undefined) { fields.push("name = ?"); params.push(name); }
    if (description !== undefined) { fields.push("description = ?"); params.push(description); }
    if (price !== undefined) { fields.push("price = ?"); params.push(price); }
    if (image_url !== undefined) { fields.push("image_url = ?"); params.push(image_url); }
    if (category !== undefined) { fields.push("category = ?"); params.push(category); }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    params.push(req.params.id);

    await db.query(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, params);

    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN: Delete product
 * DELETE /api/products/:id
 */
router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
