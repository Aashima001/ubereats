import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSearch, FaShoppingCart, FaHeart, FaSignOutAlt } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("search");
    const [userName, setUserName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
        }
    

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (restaurantId) => {
        let updatedFavorites;
        if (favorites.includes(restaurantId)) {
            updatedFavorites = favorites.filter(id => id !== restaurantId);
        } else {
            updatedFavorites = [...favorites, restaurantId];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

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
    <div className="dashboard-container">
        <div className="navbar">
            <div className="nav-left">
                <button className="menu-btn" onClick={()=> setMenuOpen(!menuOpen)}>
                    <FaBars size={20} color="fff"/>
                </button>
                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="dropdown-menu">
                        <div className="user-info">
                        <p className="user-name>">{userName ? userName : "Guest"}</p>
                    </div>
                        <button onClick={() => navigate('/manageaccount')}>ManageAccount</button>
                        <button onClick={() => navigate('/orderhistory')}><FaShoppingCart/>Orders</button>
                        <button onClick={() => navigate('/favorites')}><FaHeart/> Favorites</button>
                        <button onClick={() => navigate('/')}><FaSignOutAlt/>Sign Out</button>
                    </div>
                )}
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." defaultValue={searchQuery || ""}onChange={(e) => navigate(`?search=${e.target.value}`)} />
                <button className="search-btn">
                    <FaSearch size={16} />
                </button>
            </div>
            <div className="nav-right">
            <button className="cart-btn">
            <button onClick={() => navigate('/shoppingcart')}><FaShoppingCart color="black"/></button>
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
                            <button className="favorite-btn" onClick={() => toggleFavorite(res.id)}>
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
