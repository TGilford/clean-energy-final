import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken } from "../auth";

export default function Layout({ children }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="app-title" aria-label="Application title">
          T65
        </h1>
        <nav
          className="main-nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/summary" className="nav-link">
            Summary
          </NavLink>
          <NavLink to="/reports" className="nav-link">
            Reports
          </NavLink>
          <button
            type="button"
            className="nav-button"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log out
          </button>
        </nav>
      </header>
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
    </div>
  );
}
