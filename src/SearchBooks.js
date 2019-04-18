import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
// import { Link } from "react-router-dom";
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
          // console.log("search term is: " + searchTerm;
          // console.log("output type is array: " + Array.isArray(books)); //=> object
          // console.log(
          // Array.isArray(books) && console.log("array length: " + books.length)
          // );
          // console.log("output: " + JSON.stringify(books));
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
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.onBackButtonPress()}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                <Book book={book} />
              </li>
            ))}{" "}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
