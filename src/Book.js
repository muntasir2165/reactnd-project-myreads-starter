import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  render() {
    const { book, booksOnShelf } = this.props;
    // console.log("===: " + book.imageLinks.thumbnail);
    // const imageUrl = book && book.imageLinks && book.imageLinks.thumbnail;
    if (booksOnShelf) {
      for (let idx = 0; idx < booksOnShelf.length; idx++) {
        const currentBook = booksOnShelf[idx];
        if (currentBook.id === book.id && !book.hasOwnProperty("shelf")) {
          book.shelf = currentBook.shelf;
          break;
        }
      }
    }
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book &&
                book.imageLinks &&
                book.imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={event =>
                this.props.updateBookShelf(book, event.target.value)
              }
              value={book.hasOwnProperty("shelf") ? book.shelf : "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors &&
            Array.isArray(book.authors) &&
            book.authors.join(", ")}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
};

export default Book;
