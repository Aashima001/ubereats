import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./loginrestaurant.css"; 

function Login() {
    const [restaurantemail, setRestaurantEmail] = useState("");
    const [restaurantpassword, setRestaurantPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked!");  // Debugging line
    
        try {
            const response = await axios.post("http://localhost:3000/loginrestaurant", { restaurantemail, restaurantpassword });
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
                <div className="navbar-title">Uber Eats</div>
            </div>

            {/* Login Form */}
            <div className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={restaurantemail}
                    onChange={(e) => {
                        console.log("Email:", e.target.value);  // Debugging line
                        setRestaurantEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={restaurantpassword}
                    onChange={(e) => {
                        console.log("Password:", e.target.value);  // Debugging line
                        setRestaurantPassword(e.target.value);
                    }}
                />
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
