def video_public_schema(video):
    return {
        "id": str(video["_id"]),
        "title": video["title"],
        "description": video["description"],
        "thumbnail_url": video["thumbnail_url"]
    }
