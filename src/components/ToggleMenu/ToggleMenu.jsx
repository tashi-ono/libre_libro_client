import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./ToggleMenu.scss";

const ToggleMenu = ({ toggleMenuClose, toggleMenu }) => {
  return (
    <div className={`toggle-nav ${toggleMenu ? "disable-desktop" : ""}`}>
      <Link className="nav-links find" to="/libraries">
        <span onClick={toggleMenuClose}>Find A Library</span>
      </Link>
      <HashLink className="nav-links list" to="/libraries#library-list">
        <span onClick={toggleMenuClose}>Library List</span>
      </HashLink>
      <Link className="nav-links about" to="/about">
        <span onClick={toggleMenuClose}>About</span>
      </Link>
    </div>
  );
};

export default ToggleMenu;
