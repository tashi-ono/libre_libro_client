import React, { useState } from "react";
import "./FilterBar.scss";

const FilterBar = ({ handleFilterSearch }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    // console.log("handle filter bar", event.target.value);
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("filterbar submit", userInput);
    handleFilterSearch(userInput);
    setUserInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="filter-search"></label>
      <input
        name="filter-search"
        onChange={handleChange}
        placeholder="Search By City Name"
        value={userInput}
      />
      <button type="submit">Search&nbsp; | &nbsp;Refresh Libraries</button>
    </form>
  );
};

export default FilterBar;
