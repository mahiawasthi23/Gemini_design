import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [username, setUsername] = useState("?");

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username.charAt(0).toUpperCase());
    } else {
      setUsername("");
    }
  }, [user]);

  const handleProfileClick = () => {
    if (!user || !user.username) {
      navigate("/login");
    } else {
      setShowOptions((prev) => !prev);
    }
  };

  return (
    <div className="navbar">
      <h1>Gemini</h1>
      <div className="profile" onClick={handleProfileClick}>
        <h2>{username}</h2>
      </div>
      {showOptions && user?.username && (
        <div className="dropdown-menu">
          <p>Welcome, {user.username}</p>
          <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;



