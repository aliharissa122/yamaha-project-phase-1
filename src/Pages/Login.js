import React, { useState } from "react";
import { login as loginApi } from "../api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginSave } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");
      const data = await loginApi({ email, password });
      loginSave(data);
      navigate("/");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header className="page-header">
        <h1>Sign In</h1>
        <p>Access your account</p>
      </header>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: 10, width: "100%", cursor: "pointer" }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={{ marginTop: 10 }}>
          No account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </main>
  );
}
