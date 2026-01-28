def success_response(data=None, message="Success", status_code=200):
    response = {
        "success": True,
        "message": message,
        "data": data
    }
    return response, status_code


def error_response(message="Something went wrong", status_code=400, errors=None):
    response = {
        "success": False,
        "message": message
    }

    if errors:
        response["errors"] = errors

    return response, status_code
