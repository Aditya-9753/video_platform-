from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from services.video_service import get_video_by_id
from services.token_service import generate_playback_token, verify_playback_token

video_bp = Blueprint("video", __name__)

# STEP 1: issue playback token
@video_bp.route("/<video_id>/stream", methods=["GET"])
@jwt_required()
def get_stream_token(video_id):
    video = get_video_by_id(video_id)
    if not video:
        return {"error": "Video not found"}, 404

    token = generate_playback_token(video_id)

    return {
        "video_id": video_id,
        "playback_token": token
    }, 200


# STEP 2: validate token & return embed url
@video_bp.route("/<video_id>/play", methods=["GET"])
def play_video(video_id):
    token = request.args.get("token")
    if not token:
        return {"error": "Token required"}, 401

    valid_video_id = verify_playback_token(token)
    if valid_video_id != video_id:
        return {"error": "Invalid or expired token"}, 403

    video = get_video_by_id(video_id)
    if not video:
        return {"error": "Video not found"}, 404

    embed_url = f"https://www.youtube.com/embed/{video['youtube_id']}?controls=1"

    return {
        "embed_url": embed_url
    }, 200
