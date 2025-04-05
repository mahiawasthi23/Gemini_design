import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const showSnackbar = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const action = (
    <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://gemini-backend-e3b4.vercel.app/api/auth/signup", {
        username,
        email,
        password,
      });
      showSnackbar("Signup successful! Please login.");
      setTimeout(() => navigate("/login"), 2000); // Give some time to read message
    } catch (error) {
      showSnackbar("Signup failed! Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-btn" type="submit">
            Signup
          </button>
        </form>
        <p className="switch-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackMessage}
        action={action}
      />
    </div>
  );
}

export default Signup;


