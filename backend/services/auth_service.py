from datetime import datetime
from bson import ObjectId
from flask_jwt_extended import create_access_token

from extensions import db
from utils.password import hash_password, verify_password
from models.user_model import user_schema


def get_users_collection():
    return db["users"]


def signup_user(name, email, password):
    users = get_users_collection()

    if not name or not email or not password:
        return None, "All fields are required"

    email = email.lower().strip()

    if users.find_one({"email": email}):
        return None, "User with this email already exists"

    user_data = {
        "name": name,
        "email": email,
        "password_hash": hash_password(password),
        "created_at": datetime.utcnow()
    }

    users.insert_one(user_data)
    return True, None


def login_user(email, password):
    users = get_users_collection()

    email = email.lower().strip()
    user = users.find_one({"email": email})

    if not user:
        print(f"DEBUG: User not found -> {email}")
        return None, "Invalid email or password"

    if not verify_password(password, user["password_hash"]):
        print(f"DEBUG: Password mismatch -> {email}")
        return None, "Invalid email or password"

    token = create_access_token(identity=str(user["_id"]))
    return token, None


def get_user_by_id(user_id):
    users = get_users_collection()

    if not ObjectId.is_valid(user_id):
        return None

    user = users.find_one({"_id": ObjectId(user_id)})
    return user_schema(user) if user else None
