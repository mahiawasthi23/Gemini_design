import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); 
        setUser({ username: decoded.username || decoded.email }); 
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem("token"); 
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);
      console.log("Login Successful, Decoded Token:", decoded);
      setUser({ username: decoded.username || decoded.email });

      alert("Login successful");
    } catch (error) {
      alert("Login failed!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
