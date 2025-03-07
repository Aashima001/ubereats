import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
}

export default Dashboard;
