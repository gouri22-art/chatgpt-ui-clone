import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const userData = localStorage.getItem(email);
    if (!userData) {
      alert("User not found! Please sign up first.");
      return;
    }

    const { password: storedPassword } = JSON.parse(userData);
    if (password !== storedPassword) {
      alert("Incorrect password!");
      return;
    }

    localStorage.setItem("user", email);
    navigate("/chat");
  };

  return (
    <div className="login-container">
      <img src="https://static.vecteezy.com/system/resources/previews/024/558/807/non_2x/openai-chatgpt-logo-icon-free-png.png" alt="Logo" className="logo" />
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Log in</button>
      </form>
      <p className="signup-link" onClick={() => navigate("/signup")}>Sign up</p>
    </div>
  );
};

export default Login;
