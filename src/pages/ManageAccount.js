import React,{useState} from "react";
import "./ManageAccount.css";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "Aradhya",
    pronouns: "Add Your Pronouns",
    phone: "+1 (123) 456-7890",
    email: "aradhya@example.com",
    country: "United States",
    state: "CA",
  });

  const countries = ["United States", "Canada", "United Kingdom", "India"];
  const stateAbbreviations = {
    "United States": ["CA", "NY", "TX", "FL"],
    Canada: ["ON", "QC", "BC", "AB"],
    "United Kingdom": ["ENG", "SCT", "WLS", "NIR"],
    India: ["MH", "DL", "KA", "TN"],
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };


  return (
    <div className="account-container">
      <div className="sidebar">
        <ul>
          <li className="active">Account info</li>
        </ul>
      </div>
      <div className="content">
        <h2>Account info</h2>
        <div className="profile">
          <div className="profile-image">
          {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              <span className="user-icon">👤</span>
            )}
            <label className="edit-icon">✏️
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
        <div className="info">
          <div className="info-item">
            <span className="label">Name</span>
            <span className="value">{customerDetails.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Pronouns</span>
            <span className="value">{customerDetails.pronouns}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone number</span>
            <span className="value">{customerDetails.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value ">{customerDetails.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Country</span>
            <select
              className="value"
              value={customerDetails.country}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, country: e.target.value, state: "" })
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
            <span className="label">State</span>
            <select
              className="value"
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
            <div classname="save-button-container" >
              <button className="save-button" onClick={() => navigate('/dashboard')}>Save Changes</button>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
