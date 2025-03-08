import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddRestaurantPage from "./pages/AddRestaurantPage";
import LoginRestaurant from "./pages/loginrestaurant";
import RestaurantProfile from "./pages/RestaurantProfile";
import OrderManagement from "./pages/OrderManagement";
import CustomerProfile from "./pages/CustomerProfile";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/AddRestaurantPage" element={<AddRestaurantPage />} />
                <Route path="/LoginRestaurant" element={<LoginRestaurant />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/restaurantprofile" element={<RestaurantProfile />} />
                <Route path="/ordermanagement" element={<OrderManagement />} />
                <Route path="/customerprofile" element={<CustomerProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
