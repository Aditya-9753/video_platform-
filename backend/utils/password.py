from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password):
    # Standard pbkdf2:sha256 hash banayega
    return generate_password_hash(password)

def verify_password(password, hashed_password):
    # Hash check karega
    return check_password_hash(hashed_password, password)