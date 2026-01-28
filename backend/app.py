from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import init_extensions

from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.video_routes import video_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # 🔥 FINAL CORS CONFIG (Expo Web + Mobile safe)
    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True
    )

    # Initialize extensions (JWT, DB, Limiter)
    init_extensions(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(video_bp, url_prefix="/api/video")

    @app.route("/", methods=["GET"])
    def root():
        return {"message": "API running"}, 200

    @app.route("/health", methods=["GET"])
    def health():
        return {"status": "Backend running 🚀"}, 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
 
 