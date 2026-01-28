from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

jwt = JWTManager()
limiter = Limiter(key_func=get_remote_address)

# MongoDB setup
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017/video_platform"
)

client = MongoClient(MONGO_URI)
db = client.get_default_database()


def init_extensions(app):
    jwt.init_app(app)
    limiter.init_app(app)
