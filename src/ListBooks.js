import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Book from "./Book";

class ListBooks extends Component {
  render() {
    const currentlyReadingBooks = this.props.books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = this.props.books.filter(
      book => book.shelf === "wantToRead"
    );
    const readBooks = this.props.books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map(book => (
                    <li key={book.id}>
                      <Book book={book} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map(book => (
                    <li key={book.id}>
                      <Book book={book} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map(book => (
                    <li key={book.id}>
                      <Book book={book} />
                    </li>
                  ))}{" "}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.props.onBookAdd()}>Add a book</button>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired
};

export default ListBooks;
