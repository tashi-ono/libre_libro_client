import React, { useState } from "react";
import FilterBar from "../FilterBar/FilterBar";

import "./LibraryList.scss";

const LibraryList = ({ allLibraries, getLibrary }) => {
  const [filteredLibs, setFilteredLibs] = useState(allLibraries);
  const reverse = require("reverse-geocode");

  const handleFilterSearch = (filterSearch) => {
    let filteredLibraries = allLibraries.filter((filteredLib) => {
      let geoObject = reverse.lookup(filteredLib.lat, filteredLib.lng, "us");
      // console.log("geoObject", geoObject);
      return geoObject.city.toLowerCase().includes(filterSearch.toLowerCase());
    });
    setFilteredLibs(filteredLibraries);
  };
  // console.log("filtered Libraries", filteredLibs);

  let displayLibraries = <h2>Loading...</h2>;
  let displayCityStates;

  if (filteredLibs[0]) {
    displayLibraries = filteredLibs.map((library) => {
      getLibrary();
      displayCityStates = reverse.lookup(library.lat, library.lng, "us");
      return (
        <div key={library.id} onClick={() => getLibrary(library)}>
          {library.name ? library.name : "New Library - Add info"}
          <span>
            {displayCityStates.city}, {displayCityStates.state_abbr}
          </span>
        </div>
      );
    });
  } else {
    if (allLibraries[0]) {
      displayLibraries = allLibraries.map((library) => {
        getLibrary();
        displayCityStates = reverse.lookup(library.lat, library.lng, "us");
        return (
          <div key={library.id} onClick={() => getLibrary(library)}>
            {library.name ? library.name : "New Library - Add info"}
            <span>
              {displayCityStates.city}, {displayCityStates.state_abbr}
            </span>
          </div>
        );
      });
    }
  }

  return (
    <div className="library-list">
      <FilterBar handleFilterSearch={handleFilterSearch} />
      {displayLibraries}
    </div>
  );
};

export default LibraryList;
