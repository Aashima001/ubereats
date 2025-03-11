import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./RestaurantProfile.css";

const RestaurantProfile = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        name: "", ingredients: "", image: "", price: "", category: "Appetizer"
    });

    const navigate = useNavigate();

    // ✅ Dynamically Fetch Latest Restaurant and Dishes
    useEffect(() => {
        axios.get("http://localhost:5001/api/restaurant")
            .then(response => {
                const allRestaurants = response.data;
                const latestRestaurant = allRestaurants.length > 0 ? allRestaurants[allRestaurants.length - 1] : null;

                if (latestRestaurant) {
                    setRestaurant(latestRestaurant);
                    console.log("✅ Using Restaurant ID:", latestRestaurant.id);

                    return axios.get(`http://localhost:5001/api/dish/byrestaurant/${latestRestaurant.id}`);
                } else {
                    console.error("❌ No restaurant found.");
                }
            })
            .then(response => {
                if (response && response.data) {
                    setDishes(response.data);
                }
            })
            .catch(error => console.error("❌ Error fetching restaurant or dishes:", error));
    }, []);

    // ✅ Handle form updates
    const handleProfileChange = (e) => {
        if (restaurant) {
            setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
        }
    };

    const handleDishChange = (e) => setNewDish({ ...newDish, [e.target.name]: e.target.value });

    // ✅ File Upload Handler
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            axios.post("http://localhost:5001/api/upload", formData)
                .then(response => {
                    console.log("✅ Uploaded image path:", response.data.imagePath);
                    setNewDish({ ...newDish, image: response.data.imagePath });
                })
                .catch(error => console.error("❌ Error uploading image:", error));
        }
    };

    // ✅ Add a New Dish
    const addDish = () => {
        if (!restaurant || !restaurant.id) {
            alert("❌ Restaurant ID missing. Try refreshing the page.");
            return;
        }

        if (!newDish.name || !newDish.price || !newDish.category) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log("🛠 Adding dish with image:", newDish.image);

        axios.post("http://localhost:5001/api/dish/add", {
            restaurant_id: restaurant.id,
            name: newDish.name,
            ingredients: newDish.ingredients,
            image: newDish.image,
            price: newDish.price,
            category: newDish.category,
        }).then(response => {
            alert("✅ Dish added successfully!");
            setDishes([...dishes, { ...newDish, id: response.data.dish.id }]);
            setNewDish({ name: "", ingredients: "", image: "", price: "", category: "Appetizer" });
        }).catch(error => {
            console.error("❌ Failed to add dish:", error);
            alert("Failed to add dish.");
        });
    };

    return (
        <div className="restaurant-profile">
            <div className="sidebar">
                <h2>Uber Eats</h2>
                <ul>
                    <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                    <li onClick={() => navigate('/ordermanagement')}>Orders</li>
                    <li className="active">Profile</li>
                    <li onClick={() => navigate('/')}>Logout</li>
                </ul>
            </div>

            <div className="main-content">
                <h2 className="title">Restaurant Profile</h2>

                {restaurant ? (
                    <div className="profile-section">
                        <h3>Restaurant Information</h3>
                        <input type="text" name="name" value={restaurant.name || ""} onChange={handleProfileChange} placeholder="Restaurant Name" />
                        <input type="text" name="location" value={restaurant.location || ""} onChange={handleProfileChange} placeholder="Location" />
                        <textarea name="description" value={restaurant.description || ""} onChange={handleProfileChange} placeholder="Description"></textarea>
                        <input type="text" name="contact_info" value={restaurant.contact_info || ""} onChange={handleProfileChange} placeholder="Contact Info" />
                        
                        <div className="timings">
                            <label>Opening Time:</label>
                            <input type="time" name="opening_time" value={restaurant.opening_time || ""} onChange={handleProfileChange} />
                            <label>Closing Time:</label>
                            <input type="time" name="closing_time" value={restaurant.closing_time || ""} onChange={handleProfileChange} />
                        </div>
                    </div>
                ) : (
                    <p>Loading restaurant details...</p>
                )}

                {/* ✅ Add a New Dish */}
                <div className="add-dish-section">
                    <h3>Add a New Dish</h3>
                    <input type="text" name="name" value={newDish.name} onChange={handleDishChange} placeholder="Dish Name" required />
                    <input type="text" name="ingredients" value={newDish.ingredients} onChange={handleDishChange} placeholder="Ingredients" />
                    <input type="number" name="price" value={newDish.price} onChange={handleDishChange} placeholder="Price" required />

                    <label>Category:</label>
                    <select name="category" value={newDish.category} onChange={handleDishChange}>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Salad">Salad</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Beverage">Beverage</option>
                    </select>

                    <label>Upload Dish Image:</label>
                    <input type="file" onChange={handleFileUpload} />
                    
                    <button onClick={addDish}>Add Dish</button>
                </div>

                {/* ✅ Fix: Ensure images load correctly in menu */}
                <div className="menu-section">
                    <h3>Restaurant Menu</h3>
                    {dishes.length > 0 ? (
                        <div className="dish-list">
                            {dishes.map((dish, index) => (
                                <div key={dish.id || index} className="dish-card">
                                    <img 
                                        src={dish.image?.startsWith("/uploads/") ? `http://localhost:5001${dish.image}` : "/images/default.jpg"}  
                                        alt={dish.name} 
                                        className="dish-img"
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        onError={(e) => { e.target.src = "/images/default.jpg"; }} 
                                    />
                                    <div className="dish-info">
                                        <h4>{dish.name}</h4>
                                        <p><strong>Category:</strong> {dish.category}</p>
                                        <p><strong>Ingredients:</strong> {dish.ingredients}</p>
                                        <p><strong>Price:</strong> ${dish.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No dishes available for this restaurant.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantProfile;

