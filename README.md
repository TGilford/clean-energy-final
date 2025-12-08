Clean Energy Final Project — T65
React + FastAPI + MySQL + JWT Authentication

This project is a Single Page Application (SPA) created for my final assignment in ITSC 5166. It demonstrates frontend–backend decoupling, JWT-based authentication, protected routes, chart visualization, and MySQL integration.

🚀 Live Application URL

http://68.183.99.66/

📦 Repository Overview
clean-energy-final/
│
├── backend/      # FastAPI backend (port 3000)
├── frontend/     # React SPA (served on port 80 via NGINX)
└── README.md

🔐 Authentication

Login Credentials:

Username: Trenity

Password: Trenity

Authentication uses JWT tokens, stored in localStorage and automatically attached to all protected /api/... routes.

📊 Features

✔ 1. Login Page
✔ 2. Dashboard
✔ 3. Summary Page
✔ 4. Reports Page
✔ 5. Protected Routes (JWT)

🛠 Backend Technologies — FastAPI

Runs on port 3000

Endpoints under /api

MySQL database hosted on FreeSQLDatabase.com

JWT signing + verification

Uses:

fastapi

uvicorn

mysql-connector-python

python-dotenv

PyJWT

🎨 Frontend Technologies — React

Full SPA hosted on port 80

React Router for navigation

ProtectedRoute wrapper for guarding pages

Recharts for visualization

WCAG accessibility considerations:

ARIA labels

Semantic tags

🗄 Database Structure (MySQL)

Table: charts

id	slug	data (JSON)
1	capacity_by_year	{"points": [...]}
2	cost_projection	{"points": [...]}

The frontend dynamically loads the correct chart based on URL slug.

🌐 Deployment Overview
Frontend

Built using: npm run build

Served via NGINX from /dist

Backend

Runs as a systemd service

Reverse-proxied through NGINX at /api

Always running after SSH disconnect

NGINX Routes
/          → React frontend
/api/...   → FastAPI backend (port 3000)

📥 Local Installation Instructions
Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 3000

Frontend
cd frontend
npm install
npm run dev

✨ Credits

Developed by Trenity Gilford
Clean Energy Research Source: [UtilityDive – Sodium-Ion Storage Advances](https://www.utilitydive.com/news/peak-energy-jupiter-sodium-ion-batteries/805784/)
