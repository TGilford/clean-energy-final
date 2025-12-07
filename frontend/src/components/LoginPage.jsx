import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../api";
import { saveToken, isAuthenticated } from "../auth";

export default function LoginPage() {
  //username and password default to "Trenity" for assignment convenience
  const [username, setUsername] = useState("Trenity");
  const [password, setPassword] = useState("Trenity");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      saveToken(data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
        aria-labelledby="login-heading"
        className="auth-form"
      >
        <h2 id="login-heading">Log in</h2>
        <p className="sr-only">
          Use your first name as both username and password.
        </p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-required="true"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
        />

        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}

        <button type="submit" className="primary-btn">
          Log in
        </button>
      </form>
    </div>
  );
}
