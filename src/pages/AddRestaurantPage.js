// AddRestaurantPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddRestaurantPage.css";

function AddRestaurantPage() {
  const [restaurantname, setRestaurantName] = useState("");
  const [restaurantemail, setRestaurantEmail] = useState("");
  const [restaurantpassword, setRestaurantPassword] = useState("");
  const [restaurantlocation, setRestaurantLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
      e.preventDefault();

      if (!restaurantname || !restaurantemail || !restaurantpassword || !restaurantlocation) {
          setError("All fields are required");
          return;
      }

      alert("Signup successful! Redirecting to login...");
      navigate("/loginrestaurant");
  };

  return (
      <div className="signup-container">
          <div className="navbar">
              <div className="navbar-title">
                <a href="/" className="home-link"> Uber Eats</a></div>
              <div className="nav-right">
              <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
          </div>
          </div>
          <div className="signup-form">
              <h2>Signup</h2>
              {error && <p className="error-message">{error}</p>}
              <input type="text" placeholder="Enter your Restaurant's Name" value={restaurantname} onChange={(e) => setRestaurantName(e.target.value)} />
              <input type="email" placeholder="Enter Email" value={restaurantemail} onChange={(e) => setRestaurantEmail(e.target.value)} />
              <input type="password" placeholder="Enter Password" value={restaurantpassword}  onChange={(e) => setRestaurantPassword(e.target.value)} />
              <input type="text" placeholder="Enter Location" value={restaurantlocation} onChange={(e) => setRestaurantLocation(e.target.value)} />
              <button className="signup-btn" onClick={handleSignup}>Create Account</button>
          </div>
      </div>
  );
}

export default AddRestaurantPage;
