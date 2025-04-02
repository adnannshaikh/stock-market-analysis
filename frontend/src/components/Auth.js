import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Create a CSS file for styling

function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form>
        {isSignup && <input type="text" placeholder="Username" required />}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <p onClick={toggleAuth}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

export default Auth;
