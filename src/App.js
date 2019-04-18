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
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
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

  render() {
    return (
      <div className="app">
        {/* {JSON.stringify(this.state.books[0])} */}
        {/* <hr /> */}
        {/* {this.state.books[0] && JSON.stringify(this.state.books[0].shelf)} */}
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBooks
              books={this.state.books}
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
