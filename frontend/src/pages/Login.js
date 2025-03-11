import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked!");  // Debugging line
    
        try {
            const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
            console.log("Response received:", response);  // Debugging line
    
            if (response.data.message === 'Login successful') {
                console.log("Login successful! Redirecting...");
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Login failed:", err.response?.data?.message || err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    

    return (
        <div className="login-container">
            {/* Navbar */}
            <div className="navbar">
                <div className="navbar-title">
                <a href="/" className="home-link"> Uber Eats</a>
                </div>
            </div>

            {/* Login Form */}
            <div className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        console.log("Email:", e.target.value);  // Debugging line
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        console.log("Password:", e.target.value);  // Debugging line
                        setPassword(e.target.value);
                    }}
                />
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
