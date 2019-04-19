import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

const ListBooks = props => {
  const { booksOnShelf, updateBookShelf, onBookAdd } = props;

  const currentlyReadingBooks = booksOnShelf.filter(
    book => book.shelf === "currentlyReading"
  );
  const wantToReadBooks = booksOnShelf.filter(
    book => book.shelf === "wantToRead"
  );
  const readBooks = booksOnShelf.filter(book => book.shelf === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={currentlyReadingBooks}
            updateBookShelf={updateBookShelf}
          />
          <BookShelf
            title="Want to Read"
            books={wantToReadBooks}
            updateBookShelf={updateBookShelf}
          />
          <BookShelf
            title="Read"
            books={readBooks}
            updateBookShelf={updateBookShelf}
          />
        </div>
      </div>
      <div className="open-search">
        <button onClick={() => onBookAdd()}>Add a book</button>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  onBookAdd: PropTypes.func.isRequired
};

export default ListBooks;
