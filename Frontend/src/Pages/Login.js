import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.scss';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // In the Login component
const handleLogin = async (e) => {
  e.preventDefault();

  const email = emailRef.current.value.trim();
  const password = passwordRef.current.value.trim();

  // Validate Email Address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate Password
  if (!password || password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8000/user/login", {
      email,
      password,
    });

    if (response.status === 200) {
      alert("Login successful");
      const user = response.data.user; // Assuming the backend returns a user object with an _id
      console.log("Logged in user ID:", user._id);
      navigate(`/userProfile/${user._id}`); // Pass user._id to the UserProfile page
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      alert("Invalid email or password");
    } else {
      console.error("Error with login:", err);
      alert("Error with login. Check the console for details.");
    }
  }
};

  return (
    <div className="container">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome To SweetShop</h2>
          <h4 className="animation a2">
            Don't have any account? <Link to="/register">Sign up</Link>
          </h4>
        </div>
        <div className="form">
          <input
            type="email"
            className="form-field animation a3"
            placeholder="Email Address"
            ref={emailRef}
          />
          <input
            type="password"
            className="form-field animation a4"
            placeholder="Password"
            ref={passwordRef}
          />
          <p className="animation a5">
            <Link to="/register">Forgot Password</Link>
          </p>
          <button className="animation a6" onClick={handleLogin}>LOGIN</button>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Login;
