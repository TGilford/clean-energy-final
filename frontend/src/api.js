import { getToken, clearToken } from "./auth";

// DEV: talk directly to FastAPI on localhost:3000
const API_BASE = "/api";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearToken();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    let detail = "Request failed";
    try {
      const err = await res.json();
      detail = err.detail || detail;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(detail);
  }

  return res.json();
}

export function login(username, password) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function fetchChart(slug) {
  return request(`/charts/${slug}`, { method: "GET" });
}
