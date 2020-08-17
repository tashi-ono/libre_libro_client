import React from "react";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = ({ handleBookClick }) => {
  return (
    <div className="navbar">
      <Link className="nav-links" to="/">
        <h1>LibreLibro</h1>
      </Link>
      <Link className="nav-links find" to="/libraries">
        <span>Find A Library</span>
      </Link>
      <Link className="nav-links about" to="/about">
        <span>About</span>
      </Link>
      <Link to="/">
        <span
          className="book-icon"
          role="img"
          aria-label="books"
          onClick={handleBookClick}
        >
          📚
        </span>{" "}
      </Link>
    </div>
  );
};

export default Nav;
