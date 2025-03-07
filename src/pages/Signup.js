import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        alert("Signup successful! Redirecting to login...");
        navigate("/login");
    };

    return (
        <div className="signup-container">
            <div className="navbar">
                <div className="navbar-title">
                <a href="/" className="home-link"> Uber Eats</a>
                </div>
            </div>
            <div className="signup-form">
                <h2>Signup</h2>
                {error && <p className="error-message">{error}</p>}
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                <button className="signup-btn" onClick={handleSignup}>Create Account</button>
            </div>
        </div>
    );
}

export default Signup;
