from datetime import datetime, timedelta
import jwt
from flask import current_app


def generate_playback_token(video_id):
    payload = {
        "video_id": video_id,
        "exp": datetime.utcnow() + timedelta(minutes=5)
    }

    token = jwt.encode(
        payload,
        current_app.config["JWT_SECRET_KEY"],
        algorithm="HS256"
    )

    return token


def verify_playback_token(token):
    try:
        payload = jwt.decode(
            token,
            current_app.config["JWT_SECRET_KEY"],
            algorithms=["HS256"]
        )
        return payload["video_id"]
    except Exception:
        return None
