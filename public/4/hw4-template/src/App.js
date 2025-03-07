import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateBook from "./components/Create/Create";
import UpdateBook from "./components/Update/Update";
import DeleteBook from "./components/Delete/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import AppClass from "./AppClass";


const App = () => {
  const [books, setBooks] = useState([]);

  // Function to add a new book
  const addBook = (book) => {
    setBooks([...books, { id: books.length + 1, ...book}]);
  };

  // Function to update an existing book
  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  // Function to delete a book
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppClass />} />
        <Route path="/home" element={<Home books={books} />} />
        <Route path="/create" element={<CreateBook addBook={addBook} />} />
        <Route path="/update/:id" element={<UpdateBook books={books} updateBook={updateBook} />} />
        <Route path="/delete/:id" element={<DeleteBook books={books} deleteBook={deleteBook} />} />
      </Routes>
    </Router>
  );
};

export default App;

