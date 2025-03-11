import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RestaurantDashboard.css";

const RestaurantDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:5001/api/restaurant/${id}`)
            .then(response => {
                setRestaurant(response.data);
                return axios.get(`http://localhost:5001/api/dish/byrestaurant/${id}`);
            })
            .then(response => setDishes(response.data))
            .catch(error => console.error("❌ Error fetching data:", error));
            return () => { isMounted = false; }; 
    }, [id]);

    // ✅ Add Dish to Cart (Restrict to One Restaurant)
    const addToCart = (dish) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let storedRestaurant = JSON.parse(localStorage.getItem("restaurant"));

        // Check if the cart contains dishes from a different restaurant
        if (cart.length > 0 && storedRestaurant?.id !== restaurant.id) {
            const confirmReplace = window.confirm(
                "You already have items from another restaurant in your cart. " +
                "Adding this item will replace your cart. Do you want to continue?"
            );

            if (!confirmReplace) return; // ✅ Stop execution if user cancels

            // ✅ Clear the cart and update with the new restaurant
            cart = [];
            localStorage.setItem("restaurant", JSON.stringify(restaurant));
        }

        // Add the dish to cart
        const existingItemIndex = cart.findIndex(item => item.id === dish.id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...dish, price: Number(dish.price), quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${dish.name} added to cart!`);
    };

    return (
        <div className="restaurant-dashboard">
            <button onClick={() => navigate("/dashboard")} className="back-btn">Back to Restaurants</button>

            {restaurant && (
                <>
                    <h2>{restaurant.name}</h2>
                    <p><strong>Location:</strong> {restaurant.location}</p>
                </>
            )}

            <h3>Menu</h3>
            <div className="menu">
                {dishes.length > 0 ? dishes.map(dish => (
                    <div key={dish.id} className="dish-card">
                        <img 
                            src={dish.image}  
                            alt={dish.name}
                            className="dish-img"
                            onError={(e) => { e.target.src = "/uploads/default.jpg"; }} 
                        />


                        <h4>{dish.name}</h4>
                        <p><strong>Category:</strong> {dish.category}</p>
                        <p><strong>Price:</strong> ${Number(dish.price).toFixed(2)}</p>
                        <button onClick={() => addToCart(dish)}>Add to Cart</button>
                    </div>
                )) : <p>No dishes available.</p>}
            </div>
        </div>
    );
};

export default RestaurantDashboard;
