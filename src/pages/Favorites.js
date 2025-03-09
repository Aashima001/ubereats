import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./Favorites.css";

function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        // Dummy restaurant data (Replace with API call if needed)
        const allRestaurants = [
            { id: 1, name: "Pizza Palace", category: "Pizza", image: "/images/pizza.jpg" },
            { id: 2, name: "Sushi House", category: "Sushi", image: "/images/sushi.jpg" },
            { id: 3, name: "Burger Joint", category: "Burgers", image: "/images/burgers.avif" },
        ];

        // Filter restaurants that are favorited
        setRestaurants(allRestaurants.filter(res => storedFavorites.includes(res.id)));
    }, []);

    return (
        <div className="favorites-container">
            {/* Navbar */}
            <div className="navbar">
                <div className="navbar-title">
                <a href="/dashboard" className="home-link"> Uber Eats</a>
                </div>
                <div className="nav-right">
                <button className="cart-btn" onClick={() => navigate('/shoppingcart')}>
                    <FaShoppingCart size={24} color="white" />
                </button>
                </div>
            </div>

            {/* Restaurant List */}
            <div className="favorites-list">
                {restaurants.length > 0 ? (
                    restaurants.map((res) => (
                        <div key={res.id} className="restaurant-card">
                            <img src={res.image} alt={res.name} className="restaurant-img" />
                            <div className="restaurant-info">
                                <h3>{res.name}</h3>
                                <p>{res.category}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-favorites">No favorite restaurants yet.</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;
