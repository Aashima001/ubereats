import React, { useState, useEffect } from "react";
import "./ManageAccount.css";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    pronouns: "",
    phone: "",
    email: "",
    country: "United States",
    state: "",
  });

  const countries = ["United States", "Canada", "United Kingdom", "India"];
  const stateAbbreviations = {
    "United States": ["CA", "NY", "TX", "FL"],
    Canada: ["ON", "QC", "BC", "AB"],
    "United Kingdom": ["ENG", "SCT", "WLS", "NIR"],
    India: ["MH", "DL", "KA", "TN"],
  };

  // Load profile data from localStorage when component mounts
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("customerProfile")) || {};
    
    // Fetch the email from localStorage where it should be set when user logs in
    const userEmail = localStorage.getItem("loggedInEmail") || ""; 
    const userName = localStorage.getItem("loggedInName") || ""; 

    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      ...storedProfile,
      email: userEmail || prevDetails.email, // Fetch logged-in email
      name: userName || prevDetails.name, // Fetch logged-in name
    }));

    // Fetch stored profile image
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  // Save Changes to localStorage
  const saveChanges = () => {
    localStorage.setItem("customerProfile", JSON.stringify(customerDetails));
    alert("✅ Profile updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="account-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <ul>
          <li className="active">Account Info</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h2>Account Info</h2>

        {/* Profile Section */}
        <div className="profile">
          <div className="profile-image">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              <span className="user-icon">👤</span>
            )}
          </div>
          <label className="upload-btn">
            Choose File
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* User Information Form */}
        <div className="info-form">
          <div className="info-item">
            <label className="label">Name:</label>
            <input
              type="text"
              className="input-field"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="info-item">
            <label className="label">Email:</label>
            <input
              type="email"
              className="input-field"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              
            />
          </div>

          <div className="info-item">
            <label className="label">Pronouns:</label>
            <input
              type="text"
              className="input-field"
              name="pronouns"
              value={customerDetails.pronouns}
              onChange={handleInputChange}
              placeholder="Enter your pronouns"
            />
          </div>

          <div className="info-item">
            <label className="label">Phone Number:</label>
            <input
              type="text"
              className="input-field"
              name="phone"
              value={customerDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="info-item">
            <label className="label">Country:</label>
            <select
              className="input-field"
              name="country"
              value={customerDetails.country}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  country: e.target.value,
                  state: "",
                })
              }
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="info-item">
            <label className="label">State:</label>
            <select
              className="input-field"
              name="state"
              value={customerDetails.state}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, state: e.target.value })
              }
              disabled={!customerDetails.country}
            >
              <option value="">Select State</option>
              {(stateAbbreviations[customerDetails.country] || []).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Save Button */}
          <div className="save-button-container">
            <button className="save-button" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
