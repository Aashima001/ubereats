import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "./ShoppingCart.css";

function ShoppingCart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        // Load cart & restaurant details from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedRestaurant = JSON.parse(localStorage.getItem("restaurant"));
        setCart(storedCart);
        setRestaurant(storedRestaurant);
    }, []);

    const updateQuantity = (index, change) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += change;
        if (updatedCart[index].quantity === 0) {
            updatedCart.splice(index, 1);
        }
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        
        <div className="shopping-cart">
            
            {/* Header with Restaurant Name */}
            {restaurant && (
                <div className="cart-header">
                    <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" />
                    <div>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.address}</p>
                    </div>
                </div>
            )}

            {/* Cart Items */}
            <div className="cart-items">
                {cart.length > 0 ? cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} className="item-img" />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.size}</p>
                            <p>${item.price.toFixed(2)}</p>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => updateQuantity(index, -1)}><FaMinus /></button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, 1)}><FaPlus /></button>
                            <button onClick={() => removeItem(index)} className="delete-btn"><FaTrash /></button>
                        </div>
                    </div>
                )) : <p className="empty-cart">Your cart is empty</p>}
            </div>

            {/* Offers Section */}
            <div className="offers">
                <h3>Offers for you</h3>
                <div className="offer-card">
                    <p className="offer-text">Add 1 for free with $20.00 purchase</p>
                    <button className="add-offer-btn"><FaPlus /></button>
                </div>
            </div>

            {/* Subtotal & Checkout */}
            <div className="cart-footer">
                <p>Subtotal: <b>${subtotal.toFixed(2)}</b></p>
                <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                    Go to checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
