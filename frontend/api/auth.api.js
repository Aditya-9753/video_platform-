// auth.api.js - Enhanced with debugging logs (remove console.logs in production)
// Import remains the same
import api from "./axiosClient";

// Signup (unchanged)
export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

// Login → Enhanced with logs for debugging 401
export const login = async (data) => {
  console.log('🔥 Login Payload Sent:', data); // Log exact payload (remove in prod)
  console.log('🔗 Resolved API URL:', `${api.defaults.baseURL}/auth/login`); // Check baseURL (remove in prod)
  
  try {
    const res = await api.post("/auth/login", data, {
      headers: { 'Content-Type': 'application/json' }, // Explicit JSON header to avoid body parse issues
    });
    console.log('✅ Login Response Data:', res.data); // Log success shape (remove in prod)
    return res.data; // { access_token: "..." }
  } catch (error) {
    console.error('❌ Login API Error Details:', {
      status: error.response?.status, // Should be 401
      message: error.response?.data?.message || error.response?.data?.error || error.message,
      fullData: error.response?.data, // Backend hints like "Invalid credentials"
    });
    throw error; // Re-throw to bubble up to LoginScreen for Alert
  }
};

// Get current user (unchanged)
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// Logout (unchanged)
export const logout = async () => {
  return api.post("/auth/logout");
};