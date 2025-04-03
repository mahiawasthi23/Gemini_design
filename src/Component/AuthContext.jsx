import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response Data:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ username: data.username, userId: data.userId })
        );

        setUser({ username: data.username, userId: data.userId });

        alert("Login successful!");
        navigate("/");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred: " + error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
