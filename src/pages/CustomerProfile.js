import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./CustomerProfile.css";

const CustomerProfile = () => {
    const { customerId } = useParams(); // Get customer ID from URL
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch customer details using the ID
        axios.get(`http://localhost:3000/customers/${customerId}`)
            .then(response => setCustomer(response.data))
            .catch(error => console.error("Error fetching customer details:", error));
    }, [customerId]);

    if (!customer) {
        return <div className="loading">Fetching customer details...</div>;
    }

    return (
        <div className="customer-profile">
        {/* Navbar */}
            <div className="navbar">
            <div className="navbar-title">Uber Eats for Merchants</div>
            <div className="nav-right" >
            <button className="nav-btn" onClick={() => navigate('/loginrestaurant')}>Logout</button>
            </div>
        </div>
        {/* Customer Profile Section */}
        <div className="customer-profile-container">
            <h2>Customer Profile</h2>
            <div className="profile-card">
                <h3>{customer.name}</h3>
                <p><strong>Location:</strong> {customer.location}</p>
                <p><strong>Contact Info:</strong> {customer.contact}</p>
                <p><strong>Description:</strong> {customer.description}</p>
                <hr />
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> {customer.orderId}</p>
                <p><strong>Order Time:</strong> {customer.orderTime}</p>
                <p><strong>Order Amount:</strong> ${customer.orderAmount}</p>
                <p><strong>Summary:</strong> {customer.orderSummary}</p>
            </div>
        </div>
        </div>
    );
};

export default CustomerProfile;
