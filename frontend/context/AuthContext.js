import React, { createContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  saveToken,
  getToken,
  removeToken,
} from "../storage/tokenStorage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load token on app start
  useEffect(() => {
    const init = async () => {
      let storedToken = null;

      if (Platform.OS === "web") {
        storedToken = localStorage.getItem("access_token");
      } else {
        storedToken = await getToken();
      }

      setToken(storedToken); // 🔥 even null is OK
      setLoading(false);
    };

    init();
  }, []);

  // 🔹 LOGIN
  const loginUser = async (jwt) => {
    if (Platform.OS === "web") {
      localStorage.setItem("access_token", jwt);
    } else {
      await saveToken(jwt);
    }
    setToken(jwt); // 🔥 TRIGGERS RE-RENDER
  };

  // 🔹 LOGOUT (🔥 MAIN FIX HERE)
  const logoutUser = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("access_token");
    } else {
      await removeToken();
    }

    setToken(null); // 🔥 THIS LINE WAS THE REAL PROBLEM
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
