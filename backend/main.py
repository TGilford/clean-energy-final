import os
import json
import datetime
from typing import Any, Dict

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import mysql.connector
import jwt
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database configuration from env vars
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
}

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGO = "HS256"

app = FastAPI(title="Clean Energy API")

# Allow requests from your frontend during dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # okay for class project
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bearer_scheme = HTTPBearer()


def get_db_connection():
    """Create a new DB connection using the config above."""
    return mysql.connector.connect(**DB_CONFIG)


def create_jwt(username: str) -> str:
    """Create a JWT token for a given username."""
    now = datetime.datetime.utcnow()
    payload = {
        "sub": username,
        "iat": now,
        "exp": now + datetime.timedelta(hours=2),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def decode_jwt(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> str:
    """Verify the JWT from the Authorization header and return the username."""
    token = credentials.credentials
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        return decoded["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/api/login")
def login(body: LoginRequest):
    """
    Simple login.
    For this assignment, both username and password must be your first name.
    """
    expected = "trenity"  # your first name, all lowercase
    if body.username.lower() != expected or body.password.lower() != expected:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt(body.username)
    return {"token": token, "user": {"name": body.username}}


@app.get("/api/charts/{slug}")
def get_chart(slug: str, user: str = Depends(decode_jwt)):
    """
    Requires a valid JWT token.
    Data is pulled from the 'charts' table you created at freesqldatabase.com.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT data FROM charts WHERE slug = %s", (slug,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Chart not found")

    # data is stored as TEXT containing JSON, so we parse it
    raw = row[0]
    if isinstance(raw, str):
        data = json.loads(raw)
    else:
        data = raw

    return {"slug": slug, "data": data}
