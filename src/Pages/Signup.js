import React, { useState } from "react";
import { signup as signupApi, login as loginApi } from "../api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
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

      await signupApi({ name, email, password });

      // auto-login after signup
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
        <h1>Create Account</h1>
        <p>Sign up to continue</p>
      </header>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
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
          placeholder="Password (min 6 chars)"
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
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p style={{ marginTop: 10 }}>
          Have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
