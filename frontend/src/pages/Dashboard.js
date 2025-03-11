import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaBars, FaSearch, FaShoppingCart, FaHeart, FaSignOutAlt } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("search");
    const [userName, setUserName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [cartCount, setCartCount] = useState(0); // ✅ Track cart count

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
        }

        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        axios.get("http://localhost:5001/api/restaurant")
            .then(response => {
                console.log("✅ Restaurants fetched:", response.data);
                setRestaurants(response.data || []);
            })
            .catch(error => {
                console.error("❌ Error fetching restaurants:", error);
                setRestaurants([]);
            });

        // ✅ Fetch cart count from localStorage
        updateCartCount();
    }, []);

    // ✅ Function to update cart count
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
    };

    const toggleFavorite = (restaurantId, event) => {
        event.stopPropagation(); // ✅ Prevents navigating while clicking favorite
        let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.includes(restaurantId)) {
            updatedFavorites = favorites.filter(id => id !== restaurantId);
            alert(" Restaurant removed from favorite!");
        } else {
            updatedFavorites = [...favorites, restaurantId];
            alert("✅ Restaurant saved as favorite!");
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const categories = [
        { name: "Grocery", icon: "/images/grocery.jpg" },
        { name: "Pizza", icon: "/images/pizza.jpg" },
        { name: "Chinese", icon: "/images/chinese.jpeg" },
        { name: "Sushi", icon: "/images/sushi.jpg" },
        { name: "Alcohol", icon: "/images/alcohol.jpg" },
        { name: "Fast Food", icon: "/images/fastfood.jpeg" },
        { name: "Mexican", icon: "/images/mexican.jpg" },
        { name: "Healthy", icon: "/images/healthy.jpg" },
        { name: "Desserts", icon: "/images/desserts.jpg" },
        { name: "Burgers", icon: "/images/burgers.avif" },
        { name: "Soup", icon: "/images/soup.jpg" },
    ];

    const filteredRestaurants = searchQuery
        ? restaurants.filter((res) =>
              res.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : restaurants;

    return (
        <div className="dashboard-container">
            <div className="navbar">
                <div className="nav-left">
                    <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaBars size={20} color="fff" />
                    </button>
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <div className="user-info">
                                <p className="user-name">{userName ? userName : "Guest"}</p>
                            </div>
                            <button onClick={() => navigate('/manageaccount')}>Manage Account</button>
                            <button onClick={() => navigate('/orderhistory')}><FaShoppingCart /> Orders</button>
                            <button onClick={() => navigate('/favorites')}><FaHeart /> Favorites</button>
                            <button onClick={() => navigate('/')}><FaSignOutAlt /> Sign Out</button>
                        </div>
                    )}
                </div>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        defaultValue={searchQuery || ""} 
                        onChange={(e) => navigate(`?search=${e.target.value}`)} 
                    />
                    <button className="search-btn">
                        <FaSearch size={16} />
                    </button>
                </div>
                <div className="nav-right">
                    <button className="cart-btn" onClick={() => navigate('/shoppingcart')}>
                        <FaShoppingCart color="black" />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* ✅ Show count */}
                    </button>
                </div>
            </div>

            <div className="categories">
                {categories.map((cat, index) => (
                    <div key={index} className="category">
                        <img src={cat.icon} alt={cat.name} className="category-icon" />
                        <p>{cat.name}</p>
                    </div>
                ))}
            </div>

            <div className="restaurant-list">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((res) => (
                        <div 
                            key={res.id} 
                            className="restaurant-card" 
                            onClick={() => navigate(`/restaurantdashboard/${res.id}`)}
                        >
                            <img 
                                src={res.image ? `http://localhost:5001${res.image}` : "/images/default.jpg"} 
                                alt={res.name} 
                                className="restaurant-img"
                                onError={(e) => { e.target.src = "/images/default.jpg"; }} 
                            />
                            <div className="restaurant-info">
                                <h3>{res.name}</h3>
                                <p>{res.category || "Restaurant"}</p>
                            </div>
                            <button 
                                className="favorite-btn" 
                                onClick={(event) => toggleFavorite(res.id, event)}
                            >
                                <FaHeart size={20} color={favorites.includes(res.id) ? "red" : "grey"} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
