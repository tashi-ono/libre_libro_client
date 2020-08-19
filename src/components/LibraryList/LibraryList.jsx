import React, { useState } from "react";
import FilterBar from "../FilterBar/FilterBar";

import "./LibraryList.scss";

const LibraryList = ({ allLibraries, getLibrary }) => {
  const [filteredLibs, setFilteredLibs] = useState(allLibraries);
  const reverse = require("reverse-geocode");

  let filteredLibraries = null;
  const handleFilterSearch = (filterSearch) => {
    filteredLibraries = allLibraries.filter((filteredLib) => {
      let geoObject = reverse.lookup(filteredLib.lat, filteredLib.lng, "us");
      return geoObject.city.toLowerCase().includes(filterSearch.toLowerCase());
    });
    setFilteredLibs(filteredLibraries);
  };

  let displayAllLibraries = <h2>Loading...</h2>;
  let displaySomeLibraries;
  let displayCityStates;
  if (filteredLibs[0]) {
    displaySomeLibraries = filteredLibs.map((library) => {
      getLibrary();
      displayCityStates = reverse.lookup(library.lat, library.lng, "us");
      return (
        <div
          className="single-library"
          key={library.id}
          onClick={() => getLibrary(library)}
        >
          <div className="library-name">
            {library.name ? library.name : "New Library - Add info"}
          </div>

          <div className="library-city-state">
            {displayCityStates.city}, {displayCityStates.state_abbr}
          </div>
        </div>
      );
    });
  } else if (!filteredLibs.length) {
    displaySomeLibraries = <p>No search results</p>;
  }

  if (allLibraries[0]) {
    displayAllLibraries = allLibraries.map((library) => {
      getLibrary();
      displayCityStates = reverse.lookup(library.lat, library.lng, "us");
      return (
        <div
          className="single-library"
          key={library.id}
          onClick={() => getLibrary(library)}
        >
          <div className="library-name">
            {library.name ? library.name : "New Library - Add info"}
          </div>

          <div className="library-city-state">
            {displayCityStates.city}, {displayCityStates.state_abbr}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="library-list-container">
      <FilterBar handleFilterSearch={handleFilterSearch} />
      <div id="library-list">
        {filteredLibs ? displaySomeLibraries : displayAllLibraries}
      </div>
    </div>
  );
};

export default LibraryList;
