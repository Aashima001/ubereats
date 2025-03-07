import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.jpg"; 
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="navbar">
                <div className="nav-left">
                    <button className="menu-btn" onClick={()=> setMenuOpen(!menuOpen)}>☰ Menu</button>
                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => navigate('/login')}>Login</button>
                            <button onClick={() => navigate('/signup')}>Signup</button>
                            <button onClick={() => navigate('/addrestaurantpage')}>Add Your Restaurant</button>
                        </div>
                    )}
                </div>
                <div className="nav-right">
                    <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="nav-btn" onClick={() => navigate('/signup')}>Signup</button>
                </div>
            </div>

            <div className="home-content">
                <h1 className="title">Uber Eats</h1>
                <p className="subtitle">Your favorite food, delivered to your door.</p>
            </div>
        </div>
    );
}

export default Home;
