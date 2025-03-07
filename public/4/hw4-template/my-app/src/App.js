import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateBook from "./components/Create/Create";
import UpdateBook from "./components/Update/Update";
import DeleteBook from "./components/Delete/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import AppClass from "./AppClass";


const App = () => {
  const [books, setBooks] = useState([
    {id: 1, title: "Entrepreneurial Nation", author: "RO Khanna" },
    {id: 2, title: "Harry Potter", author: "JK Rowling" },
    {id: 3, title: "Psychology of Money", author: "Morgan Housal" }
  ]);

  // Function to add a new book
  const addBook = (book) => {
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) +1 : 1;
    setBooks([...books, { id: newId, ...book}]);
  };

  // Function to update an existing book
  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  // Function to delete a book
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books"));
    if (savedBooks) {
      setBooks(savedBooks);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppClass />} />
        <Route path="/" element={<Home books={books} />} />
        <Route path="/create" element={<CreateBook addBook={addBook} />} />
        <Route path="/update/:id" element={<UpdateBook books={books} updateBook={updateBook} />} />
        <Route path="/delete/:id" element={<DeleteBook books={books} deleteBook={deleteBook} />} />
      </Routes>
    </Router>
  );
};

export default App;

