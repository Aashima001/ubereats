import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./OrderManagement.css";

const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch orders from API
        axios.get("http://localhost:3000/orders")
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    // Function to update order status
    const updateOrderStatus = (orderId, newStatus) => {
        axios.put(`http://localhost:3000/orders/${orderId}`, { status: newStatus })
            .then(() => {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            })
            .catch(error => console.error("Error updating order status:", error));
    };

    // Function to filter orders
    const filteredOrders = orders.filter(order => 
        filterStatus === "All" || order.status === filterStatus
    );

    return (
        <div className="order-profile">
        {/* Navbar */}
            <div className="navbar">
            <div className="navbar-title">Uber Eats for Merchants</div>
            <div className="nav-right" >
            <button className="nav-btn" onClick={() => navigate('/loginrestaurant')}>Logout</button>
            </div>
            </div>
        {/* Orders Management Section */}
        <div className="orders-container">
            <h2>Orders Management</h2>

            {/* Filter Orders by Status */}
            <div className="filter-section">
                <label>Filter by Status:</label>
                <select onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="New">New</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders List */}
            <div className="orders-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <div key={order.id} className="order-card">
                            <h3>Order #{order.id}</h3>
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Status:</strong> {order.status}</p>

                            {/* Update Order Status */}
                            <label>Update Status:</label>
                            <select onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                                <option value="Order Received">Order Received</option>
                                <option value="Preparing">Preparing</option>
                                <option value="On the Way">On the Way</option>
                                <option value="Pick-up or Ready">Pick-up or Ready</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Picked Up">Picked Up</option>
                            </select>

                            {/* View Customer Profile */}
                            <button className="view-profile-btn" onClick={() => navigate('/customerprofile/${order.customerId}')}>
                                View Customer Profile</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default OrdersManagement;
