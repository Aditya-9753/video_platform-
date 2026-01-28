import os
from datetime import timedelta
from dotenv import load_dotenv

# .env file se variables load karne ke liye
load_dotenv()

class Config:
    """
    Flask Application Configuration
    """
    
    # --- FLASK SETTINGS ---
    # Secret key for session signing and CSRF
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-default-key")
    
    # Environment mode (development/production)
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    DEBUG = FLASK_ENV == "development"

    # --- JWT SETTINGS ---
    # Secret key for JWT token signing
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-default-key")
    
    # Token expiration time (1 hour)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # --- MONGODB SETTINGS ---
    # MongoDB connection URI
    # Defaulting to localhost if not found in .env
    MONGO_URI = os.getenv(
        "MONGO_URI", 
        "mongodb://localhost:27017/video_platform"
    )

    # --- OTHER SETTINGS ---
    # Example: Upload folder for videos
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads')