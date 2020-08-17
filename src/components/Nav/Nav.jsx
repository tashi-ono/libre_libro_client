import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <div className="navbar">
      <Link className="nav-links" to="/">
        <h1>LibreLibro</h1>
      </Link>
      <Link className="nav-links" to="/libraries">
        <span>Find A Library</span>
      </Link>
      <Link className="nav-links" to="/about">
        <span>About</span>
      </Link>
      <Link to="/">
        <span className="book-icon" role="img" aria-label="books">
          📚
        </span>{" "}
      </Link>
    </div>
  );
};

export default Nav;
