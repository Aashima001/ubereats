import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateUser from "./components/Create/Create";
import UpdateUser from "./components/Update/Update";
import DeleteUser from "./components/Delete/Delete";
import AppClass from './AppClass';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Parth Marathe" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jane Smith" }
  ]);

  // Function to add a new user
  const addUser = (name) => {
    const newUser = { id: users.length + 1, name };
    setUsers([...users, newUser]);
  };

  // Function to update user by ID
  const updateUser = (id, newName) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, name: newName } : user)));
  };

  // Function to delete a user by ID
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppClass />} />
        <Route path="/home" element={<Home users={users} />} />
        <Route path="/create" element={<CreateUser addUser={addUser} />} />
        <Route path="/update" element={<UpdateUser updateUser={updateUser} />} />
        <Route path="/delete" element={<DeleteUser deleteUser={deleteUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
