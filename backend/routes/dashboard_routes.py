from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from services.video_service import get_dashboard_videos

dashboard_bp = Blueprint("dashboard", __name__)

# 👇 Dono routes allow karo (NO redirect)
@dashboard_bp.route("", methods=["GET"])
@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard():
    try:
        videos = get_dashboard_videos()
        return jsonify(videos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
