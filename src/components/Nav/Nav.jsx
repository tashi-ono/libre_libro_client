import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./Nav.scss";

const Nav = ({ handleBookClick }) => {
  return (
    <div className="navbar">
      <Link className="nav-links" to="/">
        <h1>LibreLibro</h1>
      </Link>
      <HashLink className="nav-links find" to="/libraries#find-library-title">
        <span>Find A Library</span>
      </HashLink>
      <HashLink className="nav-links list" to="/libraries#library-list">
        <span>Library List</span>
      </HashLink>
      <Link className="nav-links about" to="/about">
        <span>About</span>
      </Link>
      <span
        className="book-icon"
        role="img"
        aria-label="books"
        onClick={handleBookClick}
      >
        📚
      </span>{" "}
    </div>
  );
};

export default Nav;
