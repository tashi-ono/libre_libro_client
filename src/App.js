import React, { useState } from "react";
import { withRouter } from "react-router";
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import "./App.scss";

function App() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleBookClick = () => {
    // console.log("handle book click");
    setToggleMenu(!toggleMenu);
  };

  const toggleMenuClose = () => {
    // console.log("handle toggle close");
    setToggleMenu(false);
  };

  return (
    <div className="App">
      <Nav handleBookClick={handleBookClick} />
      <Main toggleMenu={toggleMenu} toggleMenuClose={toggleMenuClose} />
      <Footer />
    </div>
  );
}

export default withRouter(App);
