import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      console.log(username, password);
      const response = await api.post("/login", { username, password });
      console.log(response.data.user);

      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
