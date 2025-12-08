#Clean Energy Final Project — T65#

React + FastAPI + MySQL + JWT Authentication

This project is a Single Page Application (SPA) created for my final assignment in ITSC 5166.
It demonstrates frontend–backend decoupling, JWT-based authentication, protected routes, chart visualization, and MySQL integration.

##🚀 Live Application URL##

http://68.183.99.66/


##📦 Repository Overview##

clean-energy-final/
│
├── backend/        # FastAPI backend (port 3000)
├── frontend/       # React SPA (served on port 80 via NGINX)
└── README.md

##🔐 Authentication##

The login credentials are:

Username: <Trenity>
Password: <Trenity>


Authentication uses JWT tokens, which are stored in localStorage and attached to all protected /api/... routes.

##📊 Features##

✅ 1. Login Page

✅ 2. Dashboard

✅ 3. Summary Page

✅ 4. Reports Page

✅ 5. Protected Routes


##🛠 Backend Technologies (FastAPI)##

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

##🎨 Frontend Technologies##

Full SPA hosted on port 80

React Router for navigation

ProtectedRoute wrapper for guarding pages

Recharts for data visualization

WCAG accessibility considerations (ARIA labels, semantic tags)

##🗄 Database Structure (MySQL)##

Table: charts

id	slug	data (JSON)
1	capacity_by_year	{"points": [...]}
2	cost_projection	{"points": [...]}

Charts are pulled dynamically based on slug.

##🌐 Deployment Overview##

The app is deployed on a Linux server using:

Frontend

Built using npm run build

Served via NGINX from /dist

Backend

Runs as a systemd service

Reverse-proxied to /api via NGINX

Always running even after SSH disconnect

NGINX

Routes:

/              → React build
/api/...       → FastAPI backend on port 3000


##📥 Installation Instructions (Local Development)##

**Backend**:

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 3000

**Frontend**:

cd frontend
npm install
npm run dev

##✨ Credits##

Developed by Trenity Gilford
Clean Energy Article: [UtilityDive – Sodium-Ion Storage Advance](https://www.utilitydive.com/news/peak-energy-jupiter-sodium-ion-batteries/805784/)s
