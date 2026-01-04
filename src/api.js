const API_URL = "http://localhost:5000/api";

export async function getProducts({ search = "", category = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_URL}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function signup({ name, email, password }) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data; // { token, user }
}

export async function uploadImage(file, token) {
  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data; // { image_url: "/uploads/xxx.png" }
}

export async function createProduct(product, token) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Create failed");
  return data;
}

export async function updateProduct(id, updates, token) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");
  return data;
}

export async function deleteProduct(id, token) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Delete failed");
  return data;
}

export async function sendContactMessage(payload) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send message");
  return data;
}

export async function getContactMessages(token) {
  const res = await fetch(`${API_URL}/contact`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load messages");
  return data;
}

export async function deleteContactMessage(id, token) {
  const res = await fetch(`${API_URL}/contact/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete message");
  return data;
}
