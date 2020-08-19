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
    <form className="filter-form" onSubmit={handleSubmit}>
      <label htmlFor="filter-search"></label>
      <input
        name="filter-search"
        onChange={handleChange}
        placeholder="Filter List By City"
        value={userInput}
      />
      <div>
        <button type="submit">Search&nbsp; | &nbsp;Refresh Libraries</button>
      </div>
    </form>
  );
};

export default FilterBar;
