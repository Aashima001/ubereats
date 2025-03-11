import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import "./Feed.css";

function Feed() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("search");

    const [menuOpen, setMenuOpen] = useState(false);

    // Dummy categories and restaurants (Replace with API calls)
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

    const restaurants = [
        { id: 1, name: "Pizza Palace", category: "Pizza", image: "/images/pizza.jpg" },
        { id: 2, name: "Sushi House", category: "Sushi", image: "/images/sushi.jpg" },
        { id: 3, name: "Burger Joint", category: "Burgers", image: "/images/burgers.avif" },
    ]
    // Filter restaurants based on search query
    const filteredRestaurants = searchQuery
        ? restaurants.filter((res) =>
              res.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : restaurants;

    return (
        <div className="feed-container">
            <div className="navbar">
                <div className="nav-left">
                    <button className="menu-btn" onClick={()=> setMenuOpen(!menuOpen)}>
                        <FaBars size={20} color="fff"/>
                    </button>
                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => navigate('/login')}>Login</button>
                            <button onClick={() => navigate('/signup')}>Signup</button>
                            <button onClick={() => navigate('/addrestaurantpage')}>Add Your Restaurant</button>
                        </div>
                    )}
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search Uber Eats..." defaultValue={searchQuery || ""}onChange={(e) => navigate(`?search=${e.target.value}`)} />
                    <button className="search-btn">
                        <FaSearch size={16} />
                    </button>
                </div>
                <div className="nav-right">
                <button className="cart-btn" onClick={() => navigate('/shoppingcart')}>
                    <FaShoppingCart size={22} color="#fff" />
                </button>
                </div>
                
            </div>

            {/* Categories */}
            <div className="categories">
                {categories.map((cat, index) => (
                    <div key={index} className="category">
                        <img src={cat.icon} alt={cat.name} className="category-icon" />
                        <p>{cat.name}</p>
                    </div>
                ))}
            </div>

            {/* Restaurant Listings */}
            <div className="restaurant-list">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((res) => (
                        <div key={res.id} className="restaurant-card" onClick={() => navigate(`/restaurantdashboard/${res.id}`)}>
                            <img src={res.image} alt={res.name} className="restaurant-img" />
                            <div className="restaurant-info">
                                <h3>{res.name}</h3>
                                <p>{res.category}</p>
                                </div>
                        </div>
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
            </div>
        </div>
    );
}

export default Feed;
