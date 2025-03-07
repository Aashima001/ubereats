import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ users }) => {
  const navigate = useNavigate();

  // useEffect runs when 'users' changes
  useEffect(() => {
    console.log("User list updated:", users);
  }, [users]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">User Management App</h1>
      <h2 className="text-center">Users List</h2>

      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text"><strong>ID:</strong> {user.id}</p>

                <div className="d-grid gap-2">
                  <button className="btn btn-warning" onClick={() => navigate("/update", { state: { id: user.id } })}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => navigate("/delete", { state: { id: user.id } })}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg" onClick={() => navigate("/create")}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default Home;
