import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteBook = ({ books, deleteBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookToDelete = books.find((book) => book.id === parseInt(id));

  const handleDelete = () => {
    deleteBook(parseInt(id));
    navigate("/home");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Delete Book</h2>

      {bookToDelete ? (
        <>
          <p>Are you sure you want to delete?x "{bookToDelete.title}" by {bookToDelete.author}?</p>
          <button onClick={handleDelete}>Delete Book</button>
        </>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
};

export default DeleteBook;
