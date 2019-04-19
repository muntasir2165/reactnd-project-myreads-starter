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
    // BooksAPI.getAll()
    //   .then(books => {
    //     this.setState(() => ({
    //       books
    //     }));
    //   })
    //   .then(() => {
    //     BooksAPI.update(this.state.books[0], "currentlyReading").then(res =>
    //       console.log("data: " + JSON.stringify(res))
    //     );
    //   });
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
      // console.log("book update shelf to " + shelf + ": " + JSON.stringify(res));
      this.getAllBooks();
    });
  };

  render() {
    return (
      <div className="app">
        {/* {JSON.stringify(this.state.books)} */}
        {/* <hr /> */}
        {/* {this.state.books[0] && JSON.stringify(this.state.books[0].shelf)} */}
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
