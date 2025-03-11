import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [restaurant, setRestaurant] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        address: "",
        paymentMethod: "Credit Card",
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedRestaurant = JSON.parse(localStorage.getItem("restaurant")) || null;

        setCart(storedCart);
        setRestaurant(storedRestaurant);
        setSubtotal(
            storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
        );

        // Load customer info from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setCustomerInfo((prev) => ({
                ...prev,
                name: loggedInUser.name,
                email: loggedInUser.email,
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };

    const placeOrder = () => {
        if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
            alert("❌ Please fill all required fields!");
            return;
        }

        if (!restaurant) {
            alert("❌ Error: No restaurant associated with this order!");
            return;
        }

        const newOrder = {
            id: Date.now(),
            restaurantId: restaurant.id, // ✅ Associate order with restaurant
            customer: {
                name: customerInfo.name,
                email: customerInfo.email,
                address: customerInfo.address,
                paymentMethod: customerInfo.paymentMethod,
            },
            items: cart,
            total: subtotal,
            status: "New", // Default status
            date: new Date().toISOString(),
        };

        console.log("✅ Order Placed:", newOrder);
        alert("🎉 Order placed successfully!");

        // Store order in localStorage
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

        localStorage.removeItem("cart");  // Clear cart after order
        navigate("/orderhistory");  // Redirect to order history
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            {/* Order Summary */}
            <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.length > 0 ? cart.map((item, index) => (
                    <div key={index} className="checkout-item">
                        <img src={item.image} alt={item.name} className="item-img" />
                        <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>Qty: {item.quantity}</p>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                )) : <p>No items in cart.</p>}

                <h3>Subtotal: <strong>${subtotal}</strong></h3>
            </div>

            {/* Customer Details Form */}
            <div className="customer-details">
                <h3>Customer Information</h3>
                <input type="text" name="name" placeholder="Full Name" value={customerInfo.name} onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email Address" value={customerInfo.email} onChange={handleInputChange} required />
                <input type="text" name="address" placeholder="Delivery Address" value={customerInfo.address} onChange={handleInputChange} required />

                <label>Payment Method:</label>
                <select name="paymentMethod" value={customerInfo.paymentMethod} onChange={handleInputChange}>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
            </div>

            {/* Place Order Button */}
            <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
        </div>
    );
}

export default Checkout;
