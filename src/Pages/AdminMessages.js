import React, { useEffect, useState } from "react";
import { getContactMessages, deleteContactMessage } from "../api";
import { useAuth } from "../auth/AuthContext";

export default function AdminMessages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await getContactMessages(token);
      setMessages(Array.isArray(data) ? data : []);
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

  const onDelete = async (id) => {
    const ok = window.confirm("Delete this message?");
    if (!ok) return;
    try {
      setMsg("");
      await deleteContactMessage(id, token);
      setMsg("Message deleted ✅");
      load();
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <main className="container">
      <header className="page-header">
        <h1>Admin — Contact Messages</h1>
        <p>Submitted from Contact Us form</p>
      </header>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
      {loading && <p>Loading...</p>}
      {!loading && messages.length === 0 && <p>No messages yet.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
          >
            <strong>{m.name}</strong> — {m.email} {m.phone ? `— ${m.phone}` : ""}
            <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{m.message}</div>
            <div style={{ marginTop: 8, opacity: 0.7, fontSize: 12 }}>
              {new Date(m.created_at).toLocaleString()}
            </div>
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => onDelete(m.id)}
                style={{ padding: 10, cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
