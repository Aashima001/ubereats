import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaBars, FaSearch} from "react-icons/fa";
import background from "../assets/background.jpg"; 
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    // Dummy restaurant and dish data (Replace this with API call)
    const restaurants = [
        { id: 1, name: "Pizza Palace", dishes: ["Margherita", "Pepperoni"] },
        { id: 2, name: "Sushi House", dishes: ["California Roll", "Tuna Sashimi"] },
        { id: 3, name: "Burger Joint", dishes: ["Cheeseburger", "Veggie Burger"] },
    ];

    // Handle Search Functionality
    const handleSearch = () => {
        if (!searchQuery.trim()) return; 
        
        // Filter restaurants or dishes matching the search query
        const filteredResults = restaurants.filter(
            (res) =>
                res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                res.dishes.some((dish) => dish.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        setSearchResults(filteredResults);
        if (filteredResults.length > 0) {
            navigate(`/feed/${filteredResults[0].id}`);
        }
    };

    return (
        <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="navbar">
                <div className="nav-left">
                    <button className="menu-btn" onClick={()=> setMenuOpen(!menuOpen)}>
                        <FaBars size={20} />
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
                {/* Search Bar */}
                <div className="search-bar">
                    <input type="text" placeholder="Browse food" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="search-btn" onClick={handleSearch}>
                        <FaSearch size={16} />
                    </button>
                </div>

                <div className="nav-right">
                    <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="nav-btn" onClick={() => navigate('/signup')}>Signup</button>
                </div>
            </div>

        </div>
    );
}

export default Home;
