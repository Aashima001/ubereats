import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUser = ({ addUser }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(name);
    navigate("/home"); // Redirect to Home
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New User</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter user name"
            value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Add User</button>
      </form>
    </div>
  );
};

export default CreateUser;
