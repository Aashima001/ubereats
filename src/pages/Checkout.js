import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();
    
    const [deliveryAddress, setDeliveryAddress] = useState("95121 Adams St, Leominster, MA");
    const [instructions, setInstructions] = useState("");
    const [deliveryOption, setDeliveryOption] = useState("Standard");
    const [cart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const storedRestaurant = localStorage.getItem("restaurant");
    const [restaurant] = useState(storedRestaurant ? JSON.parse(storedRestaurant) : null);


    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 0.99;
    const taxes = 3.56;
    const total = subtotal + deliveryFee + taxes;

    return (
        <div className="checkout-container">
            {/* Header */}
            <div className="checkout-header">
                <h2>Uber Eats</h2>
                <button className="back-btn" onClick={() => navigate("/dashboard")}>Back to Store</button>
            </div>

            <div className="checkout-content">
                {/* Left Section - Delivery Details */}
                <div className="checkout-left">
                    {/* Delivery Address */}
                    <div className="section">
                        <h3>Address details</h3>
                        <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                        <h3>
                            Delivery Instructions</h3>
                            <input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                        
                    </div>


                    {/* Payment Section */}
                    <div className="section">
                        <h3>Payment</h3>
                        <button className="add-payment-btn"> Only Cash On delivery Acceptable</button>
                    </div>

                    <button className="continue-payment-btn" onClick={() => navigate("/orderconfirmation")}>Continue to payment</button>
                </div>

                {/* Right Section - Cart Summary */}
                <div className="checkout-right">
                    {restaurant ?(
                    <div className="restaurant-info">
                        <img src={restaurant.image} alt={restaurant.name} />
                        <div>
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.address}</p>
                        </div>
                    </div>
                    ):(
                    <p>No restaurant selected</p>
                )}
                    <button className="continue-payment-btn"onClick={() => navigate("/orderconfirmation")}>Continue to payment</button>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <h3>Cart summary ({cart.length} items)</h3>
                        <div className="order-total">
                            <p>Subtotal: <b>${subtotal.toFixed(2)}</b></p>
                            <p>Delivery Fee: <b>${deliveryFee.toFixed(2)}</b></p>
                            <p>Taxes & Other Fees: <b>${taxes.toFixed(2)}</b></p>
                            <p className="total">Total: <b>${total.toFixed(2)}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
