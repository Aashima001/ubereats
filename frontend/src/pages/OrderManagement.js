import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderManagement.css";

const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );

        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    const filteredOrders = orders.filter(order =>
        (filterStatus === "All" || order.status === filterStatus) &&
        ((order.customerName || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
         (order.id ? order.id.toString().includes(searchQuery) : false))
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "New": return "#007bff";
            case "Preparing": return "#ff9800";
            case "On the Way": return "#ffc107";
            case "Delivered": return "#28a745";
            case "Cancelled": return "#dc3545";
            default: return "#6c757d";
        }
    };

    return (
        <div className="order-management-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">Uber Eats</h2>
                <nav>
                    <ul>
                        <li onClick={() => navigate("/restaurantprofile")}>Dashboard</li>
                        <li className="active">Orders</li>
                        <li onClick={() => navigate("/loginrestaurant")}>Logout</li>
                    </ul>
                </nav>
            </aside>

            {/* Orders Content */}
            <div className="orders-content">
                <h2>Order Management</h2>

                {/* Search & Filter Section */}
                <div className="filter-section">
                    <input
                        type="text"
                        placeholder="Search Order ID or Customer Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">All Orders</option>
                        <option value="New">New</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On the Way">On the Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                {filteredOrders.length > 0 ? (
                    <div className="orders-grid">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="order-card" style={{ borderLeft: `5px solid ${getStatusColor(order.status)}` }}>
                                <h3>Order #{order.id}</h3>
                                <p><strong>Customer:</strong> {order.customerName || "Unknown"}</p>
                                <p><strong>Status:</strong> <span style={{ color: getStatusColor(order.status) }}>{order.status}</span></p>

                                {/* Show the list of ordered dishes */}
                                <div className="order-items">
                                    <h4>Items:</h4>
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item, index) => (
                                            <div key={index} className="order-item">
                                                <img src={item.image || "/images/default.jpg"} alt={item.name || "Unknown"} className="item-img" />
                                                <div>
                                                    <p><strong>{item.name || "Unknown Item"}</strong></p>
                                                    <p>Qty: {item.quantity || 0}</p>
                                                    <p>Price: ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No items found.</p>
                                    )}
                                </div>

                                <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                                    <option value="New">New</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="On the Way">On the Way</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrdersManagement;
