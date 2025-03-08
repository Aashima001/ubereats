import React, { useState } from "react";
import "./RestaurantProfile.css";

function RestaurantProfile() {
  const [restaurant, setRestaurant] = useState({
    name: "Your Restaurant",
    location: "City, Country",
    description: "Delicious meals served fresh!",
    contact: "123-456-7890",
    timings: "10:00 AM - 11:00 PM",
    image: "",
  });

  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: "",
    ingredients: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });

  const handleProfileChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleDishChange = (e) => {
    setNewDish({ ...newDish, [e.target.name]: e.target.value });
  };

  const addDish = () => {
    if (!newDish.name || !newDish.price || !newDish.category) {
      alert("Please fill in all required fields.");
      return;
    }
    setDishes([...dishes, newDish]);
    setNewDish({ name: "", ingredients: "", image: "", price: "", description: "", category: "" });
  };

  return (
    <div className="restaurant-profile">
      {/* Navbar */}
      <div className="navbar">
      <div className="navbar-title">Uber Eats for Merchants</div>
       <div className="nav-right" >
        <button className="nav-btn" onClick={() => navigate('/loginrestaurant')}>Logout</button>
      </div>
    </div>
      {/* Restaurant Profile Section */}
      <div className="profile-section">
        <h3>Restaurant Information</h3>
        <input type="text" name="name" value={restaurant.name} onChange={handleProfileChange} placeholder="Restaurant Name" />
        <input type="text" name="location" value={restaurant.location} onChange={handleProfileChange} placeholder="Location" />
        <textarea name="description" value={restaurant.description} onChange={handleProfileChange} placeholder="Description"></textarea>
        <input type="text" name="contact" value={restaurant.contact} onChange={handleProfileChange} placeholder="Contact Info" />
        <input type="text" name="timings" value={restaurant.timings} onChange={handleProfileChange} placeholder="Timings" />
        <input type="file" name="image" onChange={(e) => setRestaurant({ ...restaurant, image: URL.createObjectURL(e.target.files[0]) })} />
        {restaurant.image && <img src={restaurant.image} alt="Restaurant" className="profile-image" />}
      </div>

      {/* Add Dish Section */}
      <div className="add-dish-section">
        <h3>Add a New Dish</h3>
        <input type="text" name="name" value={newDish.name} onChange={handleDishChange} placeholder="Dish Name" required />
        <input type="text" name="ingredients" value={newDish.ingredients} onChange={handleDishChange} placeholder="Ingredients" />
        <input type="text" name="price" value={newDish.price} onChange={handleDishChange} placeholder="Price" required />
        <textarea name="description" value={newDish.description} onChange={handleDishChange} placeholder="Description"></textarea>
        <select name="category" value={newDish.category} onChange={handleDishChange} required>
          <option value="">Select Category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Salad">Salad</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input type="file" name="image" onChange={(e) => setNewDish({ ...newDish, image: URL.createObjectURL(e.target.files[0]) })} />
        {newDish.image && <img src={newDish.image} alt="Dish Preview" className="dish-image" />}
        <button onClick={addDish}>Add Dish</button>
      </div>

      {/* List of Added Dishes */}
      <div className="dishes-list">
        <h3>Added Dishes</h3>
        {dishes.length === 0 ? (
          <p>No dishes added yet.</p>
        ) : (
          <ul>
            {dishes.map((dish, index) => (
              <li key={index} className="dish-item">
                <img src={dish.image} alt={dish.name} className="dish-image" />
                <div>
                  <h4>{dish.name}</h4>
                  <p>{dish.description}</p>
                  <p><strong>Price:</strong> ${dish.price}</p>
                  <p><strong>Category:</strong> {dish.category}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RestaurantProfile;
