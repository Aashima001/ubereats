import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

function OrderHistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        // ✅ Get logged-in restaurant details
        const storedRestaurant = JSON.parse(localStorage.getItem("restaurant")) || null;
        setRestaurant(storedRestaurant);

        // ✅ Fetch orders from localStorage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        console.log("🔍 Loaded Orders from Storage:", storedOrders);

        // ✅ Filter orders for the logged-in restaurant
        const restaurantOrders = storedRestaurant
            ? storedOrders.filter(order => order.restaurantId === storedRestaurant.id)
            : storedOrders;

        setOrders(restaurantOrders);
    }, []);

    return (
        <div className="order-history-container">
            <h2>Order History</h2>

            {orders.length > 0 ? (
                <div className="orders-list"> {/* Wrap in a flexbox container */}
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <h3>Order ID: {order.id}</h3>
                            <p><strong>Date:</strong> {order.date}</p>
                            <p><strong>Customer:</strong> {order.customer?.name || "Unknown"}</p>
                            <p><strong>Address:</strong> {order.customer?.address || "Not Provided"}</p>
                            <p><strong>Payment Method:</strong> {order.customer?.paymentMethod || "Not Provided"}</p>
                            
                            <div className="order-items">
                                <h4>Items:</h4>
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={item.image} alt={item.name} className="item-img" />
                                        <div>
                                            <p><strong>{item.name}</strong></p>
                                            <p>Qty: {item.quantity}</p>
                                            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        <h3>Total: <strong>${Number(order.total).toFixed(2)}</strong></h3>
                    </div>
                ))}
                </div>
            ) : (
                <p>No past orders found.</p>
            )}

            {/* Back to Dashboard Button */}
            <button className="back-btn" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        </div>
    );
}

export default OrderHistory;
