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

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to fetch location based on ZIP code
  const fetchLocationFromZip = async (zip) => {
    try {
      const response = await axios.get(`https://api.zippopotam.us/us/${zip}`);
      if (response.data.places && response.data.places.length > 0) {
        const place = response.data.places[0];
        setRestaurantLocation(`${place['place name']}, ${place['state abbreviation']}`);
      } else {
        setRestaurantLocation("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setRestaurantLocation("Error retrieving location");
    }
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateEmail(restaurantemail)) {
      setError("Invalid email format");
      return;
    }
    if (!restaurantname || !restaurantemail || !restaurantpassword || !restaurantzipcode || !restaurantlocation) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/restaurant/create", {
        owner_id: null,  // If there's no owner, set to null
        name: restaurantname,
        email: restaurantemail,
        password: restaurantpassword,
        description: "",  // Provide a default empty value
        location: restaurantlocation,
        contact_info: "",  // Empty value
        images: "",  // Empty value
        timings: "",  // Empty value
    });
    
      console.log("Response received:", response);

      if (response.data.success) {
        console.log("Signup successful! Redirecting...");
        navigate("/loginrestaurant");
    }
    
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message || err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="navbar">
        <div className="navbar-title">
          <a href="/" className="home-link">Uber Eats</a>
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate('/loginrestaurant')}>Login</button>
        </div>
      </div>
      
      <div className="signup-form">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input 
          type="text" 
          placeholder="Enter your Restaurant's Name" 
          value={restaurantname} 
          onChange={(e) => setRestaurantName(e.target.value)} 
        />

        <input 
          type="email" 
          placeholder="Enter Email" 
          value={restaurantemail} 
          onChange={(e) => setRestaurantEmail(e.target.value)} 
        />

        <input 
          type="password" 
          placeholder="Enter Password" 
          value={restaurantpassword}  
          onChange={(e) => setRestaurantPassword(e.target.value)} 
        />

        <input 
          type="text" 
          placeholder="Enter ZIP Code" 
          value={restaurantzipcode} 
          onChange={(e) => { 
            setRestaurantZipcode(e.target.value);
            if (e.target.value.length === 5) {
              fetchLocationFromZip(e.target.value);
            }
          }} 
        />

        <input 
          type="text" 
          placeholder="Detected Location" 
          value={restaurantlocation} 
          onChange={(e) => setRestaurantLocation(e.target.value)} 
        />

        <button className="signup-btn" onClick={handleSignup}>Create Account</button>
      </div>
    </div>
  );
}

export default AddRestaurantPage;
