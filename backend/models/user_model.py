def user_schema(user):
    """
    Convert MongoDB user document to safe response
    """
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "created_at": user["created_at"]
    }
