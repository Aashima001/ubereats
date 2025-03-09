import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./RestaurantDashboard.css";

function RestaurantDashboard() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get restaurant ID from URL
    const [restaurant, setRestaurant] = useState(null);
    const [cart, setCart] = useState([]);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        // Dummy restaurant data (Replace with API)
        const restaurants = [
            { id: 1, name: "Pizza Palace", category: "Pizza", image: "/images/pizza.jpg" },
            { id: 2, name: "Sushi House", category: "Sushi", image: "/images/sushi.jpg" },
            { id: 3, name: "Burger Joint", category: "Burgers", image: "/images/burgers.avif" },
        ];

        const foundRestaurant = restaurants.find(res => res.id === parseInt(id));
        if (foundRestaurant) {
            setRestaurant(foundRestaurant);
        }

        // Dummy dishes for each restaurant
        const dishesData = {
            1: [
                { id: 101, name: "Pepperoni Pizza", price: 12.99 },
                { id: 102, name: "Margherita Pizza", price: 10.99 },
            ],
            2: [
                { id: 201, name: "Salmon Sushi", price: 8.99 },
                { id: 202, name: "Tuna Roll", price: 9.99 },
            ],
            3: [
                { id: 301, name: "Cheeseburger", price: 7.99 },
                { id: 302, name: "Double Patty Burger", price: 9.99 },
            ],
        };

        setDishes(dishesData[id] || []);

        // Load existing cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, [id]);

    const addToCart = (dish) => {
        const updatedCart = [...cart, dish];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    if (!restaurant) {
        return <p>Loading restaurant details...</p>;
    }

    return (
        <div className="restaurant-dashboard">
            {/* Navbar */}
            <div className="navbar">
                <h2>{restaurant.name}</h2>
                <button className="cart-btn" onClick={() => navigate('/shoppingcart')}>
                    <FaShoppingCart size={24} color="black" />
                </button>
            </div>

            {/* Restaurant Details */}
            <div className="restaurant-info">
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" />
                <h3>{restaurant.category}</h3>
            </div>

            {/* Dishes List */}
            <div className="dishes-list">
                {dishes.map((dish) => (
                    <div key={dish.id} className="dish-card">
                        <h4>{dish.name}</h4>
                        <p>${dish.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(dish)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RestaurantDashboard;
