import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// 1. Axios instance create karo - FINAL: localhost for RN emulator (Android: 10.0.2.2 if needed)
const api = axios.create({
  baseURL: "http://localhost:5000/api",  // ✅ FINAL: localhost:5000 (127.0.0.1 block fix)
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Token attach sirf protected routes pe - auth routes SKIP (401 fix)
api.interceptors.request.use(
  async (config) => {
    // ✅ FINAL: Login/signup pe token mat bhejo (main 401 cause tha)
    if (config.url.includes('/auth/login') || config.url.includes('/auth/signup')) {
      console.log('🔒 Skipping token for auth route:', config.url);  // Debug (remove prod mein)
      return config;
    }

    let token = null;
    try {
      if (Platform.OS === "web") {
        token = localStorage.getItem("token");
      } else {
        token = await SecureStore.getItemAsync("token");
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Token fetch error in AxiosClient:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: 401 pe token clear - auth routes pe skip (loop avoid)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // ✅ FINAL: Auth routes pe clear mat kar (creds galat hone pe normal error)
      if (error.config.url.includes('/auth/login') || error.config.url.includes('/auth/signup')) {
        console.log('🔑 Auth 401 - Invalid creds, not clearing token');
        return Promise.reject(error);
      }
      
      console.log("Session expired. Clearing token...");
      try {
        if (Platform.OS === "web") {
          localStorage.removeItem("token");
        } else {
          await SecureStore.deleteItemAsync("token");
        }
      } catch (clearError) {
        console.error("Token clear error:", clearError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;