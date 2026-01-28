# 🎬 Video Platform – Secure Video Streaming Application

Video Platform is a full-stack video streaming application built using **Flask (Python)** for the backend and **React Native (Expo)** for the frontend.  
The application allows authenticated users to browse videos from a dashboard and play them securely using a token-based playback mechanism.

This project demonstrates a clean and secure full-stack architecture with proper authentication, protected APIs, and controlled video access.

---

## 🚀 Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Tokens stored securely (SecureStore / LocalStorage)
- Protected routes for authenticated users only

### 📺 Video Dashboard
- Displays a list of active videos
- Shows video thumbnail, title, and description
- Pull-to-refresh support
- Clean and responsive UI

### ▶️ Secure Video Playback (Core Feature)
- Playback tokens generated only for logged-in users
- Token validation before video playback
- Prevents unauthorized access to videos
- YouTube video embedding using verified tokens

### ⚙️ Settings
- Logout functionality
- Dark mode toggle (UI-level)
- About application information
- Simple and clean settings screen

---

## 👤 User Flow

1. User registers or logs in
2. User is redirected to the dashboard
3. User browses available videos
4. User selects a video
5. Backend generates a short-lived playback token
6. Token is verified before playing the video
7. User can logout from the settings screen


---

## 🛠 Tech Stack

### Frontend
- React Native (Expo)
- React Navigation
- Axios
- Context API
- SecureStore
- WebView / iframe for video playback

### Backend
- Python
- Flask
- Flask-JWT-Extended
- MongoDB
- Flask-CORS
- JWT-based playback token system

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret

BAckend Setup
cd backend
pip install flask flask-cors flask-jwt-extended pymongo
python app.py

http://localhost:5000

Frontend Setup

cd frontend
npm install
npm start


📈 Future Enhancements

Video upload functionality

Role-based access (Admin / User)

Search and filtering

Pagination

Premium / locked video content

Global dark mode support


👤 Author


Aditya Tiwari 

GitHub: https://github.com/Aditya-9753

