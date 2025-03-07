import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      addBook({ title, author });
      navigate("/home"); // Redirect to home
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
            <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>    
        <button type="submit" className="btn btn-success w-100">Add Book</button>
      </form>
    </div>
  );
};

export default CreateBook;
