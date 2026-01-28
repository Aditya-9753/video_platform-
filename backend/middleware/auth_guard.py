from functools import wraps
from flask import request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity


def auth_guard(fn):
    """
    Custom auth middleware
    JWT valid hai ya nahi check karta hai
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            return fn(*args, **kwargs)
        except Exception:
            return {
                "success": False,
                "message": "Unauthorized access"
            }, 401

    return wrapper
