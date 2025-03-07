import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateUser = ({ updateUser }) => {
  // useLocation hook will help to fetch the user id
  const location = useLocation();
  const [id] = useState(location.state?.id || "");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(Number(id), name);
    navigate("/home");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update User</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter new name"
            value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning w-100">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
