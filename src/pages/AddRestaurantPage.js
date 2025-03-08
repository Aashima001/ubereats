// AddRestaurantPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddRestaurantPage.css";

function AddRestaurantPage() {
  const [restaurantname, setRestaurantName] = useState("");
  const [restaurantemail, setRestaurantEmail] = useState("");
  const [restaurantzipcode, setRestaurantZipcode] = useState("");
  const [restaurantpassword, setRestaurantPassword] = useState("");
  const [restaurantlocation, setRestaurantLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const fetchLocationFromZip = async(zip) => {
    try {
      const response = await axios.get(`https://api.zippopotam.us/us/${zip}`);
      if (response.data.length > 0) {
        setRestaurantLocation(response.data[0].display_name);
    } else {
        setRestaurantLocation("Location not found");
    }
    } catch (error) {
        console.error("Error fetching location:", error);
        setRestaurantLocation("Error retrieving location");
    }
  };
  
  const handleSignup = async(e) => {
      e.preventDefault();
      if (!validateEmail(restaurantemail)) {
        setError("Invalid email format");
        return;
    }
      if (!restaurantname || !restaurantemail || !restaurantpassword || !restaurantzipcode || !restaurantlocation) {
          setError("All fields are required");
          return;
      }
      try {
        const response = await axios.post("http://localhost:3000/loginrestaurant", {
            restaurantemail, 
            restaurantpassword, 
            //location
        });

        console.log("Response received:", response);

        if (response.data.message === 'Login successful') {
            console.log("Login successful! Redirecting...");
            navigate("/restaurantprofile");
        }
    } catch (err) {
        console.error("Login failed:", err.response?.data?.message || err);
        setError(err.response?.data?.message || 'Login failed');
    }
      alert("Welcome to Uber Eats...");
      navigate("/loginrestaurant");
  };

  return (
      <div className="signup-container">
          <div className="navbar">
              <div className="navbar-title">
                <a href="/" className="home-link"> Uber Eats</a></div>
              <div className="nav-right">
              <button className="nav-btn" onClick={() => navigate('/loginrestaurant')}>Login</button>
          </div>
          </div>
          <div className="signup-form">
              <h2>Signup</h2>
              {error && <p className="error-message">{error}</p>}
              <input type="text" placeholder="Enter your Restaurant's Name" value={restaurantname} onChange={(e) => setRestaurantName(e.target.value)} />
              <input type="email" placeholder="Enter Email" value={restaurantemail} onChange={(e) => setRestaurantEmail(e.target.value)} />
              <input type="password" placeholder="Enter Password" value={restaurantpassword}  onChange={(e) => setRestaurantPassword(e.target.value)} />
              <input type="text" placeholder="Enter ZIP Code" value={restaurantzipcode} onChange={(e) => 
              { 
                setRestaurantZipcode(e.target.value);
                    if (e.target.value.length === 5) {
                        fetchLocationFromZip(e.target.value);
                    }
                }
            }/>
              <input type="text" placeholder="Detected Location" value={restaurantlocation} readOnly/>
              <button className="signup-btn" onClick={handleSignup}>Create Account</button>
          </div>
      </div>
  );
}

export default AddRestaurantPage;
