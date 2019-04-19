import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    searchTerm: "",
    searchBookResults: []
  };

  updateSearchTerm = searchTerm => {
    this.setState(() => ({
      searchTerm: searchTerm,
      searchBookResults: []
    }));
    searchTerm !== "" &&
      BooksAPI.search(searchTerm)
        .then(books => {
          if (Array.isArray(books)) {
            this.setState(() => ({
              searchBookResults: [...books]
            }));
          }
        })
        .catch(err => console.log("error: " + err));
  };

  render() {
    const { searchTerm, searchBookResults } = this.state;
    const { booksOnShelf, updateBookShelf, onBackButtonPress } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => onBackButtonPress()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={event =>
                this.updateSearchTerm(event.target.value.trim())
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBookResults.map(book => (
              <li key={book.id}>
                <Book
                  booksOnShelf={booksOnShelf}
                  book={book}
                  updateBookShelf={updateBookShelf}
                />
              </li>
            ))}{" "}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  onBackButtonPress: PropTypes.func.isRequired
};

export default SearchBooks;
