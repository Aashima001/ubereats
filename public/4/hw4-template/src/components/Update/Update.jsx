import React, { use, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateBook = ({ books, updateBook }) => {
  //useLocation hook will help to fetch the book id
  const location= useLocation();
  const {id } = useParams();
  const navigate = useNavigate();
  const bookToEdit = books.find((book) => book.id === parseInt(id));

  const [title, setTitle] = useState(bookToEdit?.title || "");
  const [author, setAuthor] = useState(bookToEdit?.author || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      updateBook({ id: parseInt(id), title, author });
      navigate("/home");
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Book</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-warning w-100">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
