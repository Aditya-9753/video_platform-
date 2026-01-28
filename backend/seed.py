from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["video_platform"]
videos = db["videos"]

videos.delete_many({})

videos.insert_many([
    {
        "title": "How Startups Fail",
        "description": "Lessons from real founders",
        "youtube_id": "abc123xyz",
        "thumbnail_url": "https://img.youtube.com/vi/abc123xyz/hqdefault.jpg",
        "is_active": True,
        "created_at": datetime.utcnow()
    },
    {
        "title": "Why Products Die",
        "description": "Hard truths about product-market fit",
        "youtube_id": "def456uvw",
        "thumbnail_url": "https://img.youtube.com/vi/def456uvw/hqdefault.jpg",
        "is_active": True,
        "created_at": datetime.utcnow()
    }
])

print("✅ Videos seeded successfully")
