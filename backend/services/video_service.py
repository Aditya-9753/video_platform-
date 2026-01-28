from bson import ObjectId
from extensions import db
from models.video_model import video_public_schema


def get_videos_collection():
    return db["videos"]


def get_dashboard_videos(limit=2):
    cursor = get_videos_collection().find({"is_active": True}).limit(limit)
    return [video_public_schema(video) for video in cursor]


def get_video_by_id(video_id):
    if not ObjectId.is_valid(video_id):
        return None
    return get_videos_collection().find_one({"_id": ObjectId(video_id)})
