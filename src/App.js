import React from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.getAllBooks();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBooks
              booksOnShelf={this.state.books}
              updateBookShelf={this.updateBookShelf}
              onBookAdd={() => {
                history.push("/search");
              }}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchBooks
              booksOnShelf={this.state.books}
              updateBookShelf={this.updateBookShelf}
              onBackButtonPress={() => {
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
