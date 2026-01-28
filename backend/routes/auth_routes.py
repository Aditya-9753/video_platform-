from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.auth_service import signup_user, login_user, get_user_by_id

# ❌ yahan url_prefix mat do
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    success, error = signup_user(
        data.get("name"),
        data.get("email"),
        data.get("password")
    )

    if error:
        return {"error": error}, 400

    return {"message": "User registered successfully"}, 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    token, error = login_user(
        data.get("email"),
        data.get("password")
    )

    if error:
        return {"error": error}, 401

    return {"access_token": token}, 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)
    return user, 200


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    # mock logout (assignment ke liye OK)
    return {"message": "Logged out"}, 200
