import React, { useEffect, useState } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    // Sample order history (Replace with API call)
    useEffect(() => {
        const sampleOrders = [
            {
                id: 1,
                orderDate: "2025-03-08 12:30 PM",
                deliveryDate: "2025-03-08 01:15 PM",
                items: [
                    { name: "Margherita Pizza", quantity: 1, price: 12.99 },
                    { name: "Garlic Bread", quantity: 2, price: 4.99 },
                ],
                totalAmount: 22.97,
            },
            {
                id: 2,
                orderDate: "2025-03-07 07:45 PM",
                deliveryDate: "2025-03-07 08:30 PM",
                items: [
                    { name: "Sushi Platter", quantity: 1, price: 18.99 },
                    { name: "Miso Soup", quantity: 1, price: 5.99 },
                ],
                totalAmount: 24.98,
            },
        ];
        setOrders(sampleOrders);
    }, []);

    return (
        <div className="order-history-container">
            {/* Navbar */}
            <div className="navbar">
            <div className="navbar-title">
                <a href="/dashboard" className="home-link"> Uber Eats</a>
                </div>
                <div className="nav-right">
                    <button className="cart-btn" onClick={() => navigate('/shoppingcart')}>
                    <FaShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="orders-list">
                {orders.length === 0 ? (
                    <p className="no-orders">No past orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <h3>Order ID: #{order.id}</h3>
                            <p><strong>Order Date:</strong> {order.orderDate}</p>
                            <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>

                            <h4>Items Ordered:</h4>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>

                            <p className="total-amount"><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
