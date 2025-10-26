import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem("authUser");
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("authToken");
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (token) localStorage.setItem("authToken", token);
      else localStorage.removeItem("authToken");
    } catch (e) {}
  }, [token]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("authUser", JSON.stringify(user));
      else localStorage.removeItem("authUser");
    } catch (e) {}
  }, [user]);

  const login = async (username, password) => {
    // If master login is enabled via env, allow a single master credential pair.
    // Vite env variables must start with VITE_. Example: VITE_MASTER_ENABLED=true
    try {
      const masterEnabled = import.meta.env.VITE_MASTER_ENABLED === "true";
      const masterUser = import.meta.env.VITE_MASTER_USER || "";
      const masterPass = import.meta.env.VITE_MASTER_PASS || "";

      if (masterEnabled) {
        if (username === masterUser && password === masterPass) {
          const fakeToken = "demo-master-token";
          setToken(fakeToken);
          setUser({ name: username });
          return { ok: true, master: true };
        }
        return { ok: false, error: "Invalid master credentials" };
      }
    } catch (e) {
      // ignore env read errors
    }

    // No backend implemented: reject when master is not enabled.
    return {
      ok: false,
      error:
        "No authentication backend configured. Enable VITE_MASTER_ENABLED or implement backend.",
    };
  };

  const register = async (username, password) => {
    // Allow register only via master when backend is not present.
    try {
      const masterEnabled = import.meta.env.VITE_MASTER_ENABLED === "true";
      const masterUser = import.meta.env.VITE_MASTER_USER || "";
      const masterPass = import.meta.env.VITE_MASTER_PASS || "";

      if (masterEnabled) {
        if (username === masterUser && password === masterPass) {
          const fakeToken = "demo-master-token";
          setToken(fakeToken);
          setUser({ name: username });
          return { ok: true, master: true };
        }
        return { ok: false, error: "Invalid master credentials" };
      }
    } catch (e) {
      // ignore
    }
    return {
      ok: false,
      error:
        "No registration backend configured. Enable VITE_MASTER_ENABLED or implement backend.",
    };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      sessionStorage.removeItem("numerologyResult");
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
