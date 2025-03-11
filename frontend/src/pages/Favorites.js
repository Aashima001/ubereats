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

        // Fetch all restaurants from API
        fetch("http://localhost:5001/api/restaurant")
            .then(response => response.json())
            .then(data => {
                const favoriteRestaurants = data.filter(res => storedFavorites.includes(res.id));
                setRestaurants(favoriteRestaurants);
            })
            .catch(error => console.error("❌ Error fetching restaurants:", error));
    }, []);

    const toggleFavorite = (restaurantId) => {
        let updatedFavorites;
        if (favorites.includes(restaurantId)) {
            updatedFavorites = favorites.filter(id => id !== restaurantId);
        } else {
            updatedFavorites = [...favorites, restaurantId];
            alert("✅ Restaurant saved as favorite!"); // Notification
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-container">
            {/* Navbar */}
            <div className="navbar">
                <div className="navbar-title">
                    <a href="/dashboard" className="home-link">Uber Eats</a>
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
                            <img 
                                src={res.image ? `http://localhost:5001${res.image}` : "/images/default.jpg"} 
                                alt={res.name} 
                                className="restaurant-img"
                            />
                            <div className="restaurant-info">
                                <h3>{res.name}</h3>
                                <p>{res.category || "Restaurant"}</p>
                            </div>
                            <button 
                                className="favorite-btn" 
                                onClick={() => toggleFavorite(res.id)}
                            >
                                <FaHeart size={20} color={favorites.includes(res.id) ? "red" : "grey"} />
                            </button>
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


