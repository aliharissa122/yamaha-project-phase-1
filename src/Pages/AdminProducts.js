import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../api";
import { useAuth } from "../auth/AuthContext";

const API_BASE = "http://localhost:5000"; // for previewing /uploads/...

function resolvePreviewUrl(image_url) {
  if (!image_url) return "";
  if (image_url.startsWith("/uploads/")) return API_BASE + image_url;
  return image_url;
}

export default function AdminProducts() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // form state (create)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "bike",
  });

  // file upload state (create)
  const [imageFile, setImageFile] = useState(null);

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      let image_url = form.image_url.trim();

      // if file selected, upload it first
      if (imageFile) {
        const uploaded = await uploadImage(imageFile, token);
        image_url = uploaded.image_url; // "/uploads/...."
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        image_url,
        category: form.category,
      };

      if (!payload.name || !payload.category || Number.isNaN(payload.price)) {
        return setErr("Please fill name, category, and a valid price.");
      }

      await createProduct(payload, token);
      setMsg("Product created ✅");
      setForm({
        name: "",
        description: "",
        price: "",
        image_url: "",
        category: "bike",
      });
      setImageFile(null);
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditImageFile(null);
    setEditForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? "",
      image_url: p.image_url || "",
      category: p.category || "bike",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditImageFile(null);
  };

  const onEditChange = (e) => {
    setEditForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const saveEdit = async () => {
    setMsg("");
    setErr("");
    try {
      let image_url = (editForm.image_url || "").trim();

      // if admin selected new file, upload it and replace image_url
      if (editImageFile) {
        const uploaded = await uploadImage(editImageFile, token);
        image_url = uploaded.image_url;
      }

      const updates = {
        name: (editForm.name || "").trim(),
        description: (editForm.description || "").trim(),
        price: Number(editForm.price),
        image_url,
        category: editForm.category,
      };

      if (!updates.name || !updates.category || Number.isNaN(updates.price)) {
        return setErr("Edit: Please fill name, category, and a valid price.");
      }

      await updateProduct(editingId, updates, token);
      setMsg("Product updated ✅");
      cancelEdit();
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const onDelete = async (id) => {
    setMsg("");
    setErr("");
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await deleteProduct(id, token);
      setMsg("Product deleted ✅");
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const createPreview =
    imageFile ? URL.createObjectURL(imageFile) : resolvePreviewUrl(form.image_url);

  const editPreview =
    editImageFile
      ? URL.createObjectURL(editImageFile)
      : resolvePreviewUrl(editForm.image_url);

  return (
    <main className="container">
      <header className="page-header">
        <h1>Admin — Products</h1>
        <p>Add / edit / delete bikes and accessories</p>
      </header>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}

      {/* CREATE FORM */}
      <section style={{ marginBottom: 30 }}>
        <h2 className="section-heading">Add Product</h2>

        <form onSubmit={onCreate} style={{ maxWidth: 700 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
              style={{ padding: 10 }}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={onChange}
              style={{ padding: 10, minHeight: 80 }}
            />

            <input
              name="price"
              placeholder="Price (number)"
              value={form.price}
              onChange={onChange}
              style={{ padding: 10 }}
              required
            />

            {/* OPTIONAL manual URL */}
            <input
              name="image_url"
              placeholder="Image URL (optional) OR upload file below"
              value={form.image_url}
              onChange={onChange}
              style={{ padding: 10 }}
            />

            {/* UPLOAD FILE */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              style={{ padding: 10 }}
            />

            {/* PREVIEW */}
            {createPreview && (
              <img
                src={createPreview}
                alt="preview"
                style={{ maxWidth: 220, borderRadius: 8, border: "1px solid #ddd" }}
              />
            )}

            <select
              name="category"
              value={form.category}
              onChange={onChange}
              style={{ padding: 10 }}
            >
              <option value="bike">bike</option>
              <option value="accessory">accessory</option>
            </select>

            <button type="submit" style={{ padding: 12, cursor: "pointer" }}>
              Create
            </button>
          </div>
        </form>
      </section>

      {/* LIST + EDIT */}
      <section>
        <h2 className="section-heading">All Products</h2>

        {loading && <p>Loading...</p>}
        {!loading && products.length === 0 && <p>No products yet.</p>}

        <div style={{ display: "grid", gap: 12 }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              {editingId === p.id ? (
                <>
                  <div style={{ display: "grid", gap: 8 }}>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={onEditChange}
                      style={{ padding: 8 }}
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={onEditChange}
                      style={{ padding: 8, minHeight: 60 }}
                    />
                    <input
                      name="price"
                      value={editForm.price}
                      onChange={onEditChange}
                      style={{ padding: 8 }}
                    />

                    {/* OPTIONAL manual URL */}
                    <input
                      name="image_url"
                      value={editForm.image_url}
                      onChange={onEditChange}
                      style={{ padding: 8 }}
                      placeholder="Image URL OR upload a new file below"
                    />

                    {/* UPLOAD NEW FILE */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                      style={{ padding: 8 }}
                    />

                    {/* PREVIEW */}
                    {editPreview && (
                      <img
                        src={editPreview}
                        alt="preview"
                        style={{
                          maxWidth: 220,
                          borderRadius: 8,
                          border: "1px solid #ddd",
                        }}
                      />
                    )}

                    <select
                      name="category"
                      value={editForm.category}
                      onChange={onEditChange}
                      style={{ padding: 8 }}
                    >
                      <option value="bike">bike</option>
                      <option value="accessory">accessory</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button onClick={saveEdit} style={{ padding: 10, cursor: "pointer" }}>
                      Save
                    </button>
                    <button onClick={cancelEdit} style={{ padding: 10, cursor: "pointer" }}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <strong>{p.name}</strong> — ${Number(p.price).toFixed(2)} —{" "}
                  <em>{p.category}</em>

                  {p.image_url && (
                    <div style={{ marginTop: 10 }}>
                      <img
                        src={resolvePreviewUrl(p.image_url)}
                        alt={p.name}
                        style={{ maxWidth: 160, borderRadius: 8, border: "1px solid #ddd" }}
                      />
                    </div>
                  )}

                  <div style={{ marginTop: 6, opacity: 0.8 }}>{p.description}</div>

                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button onClick={() => startEdit(p)} style={{ padding: 10, cursor: "pointer" }}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(p.id)} style={{ padding: 10, cursor: "pointer" }}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
