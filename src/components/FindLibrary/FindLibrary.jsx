import React, { useState } from "react";
import Map from "../Map/Map";
import LibraryList from "../LibraryList/LibraryList";
import "./FindLibrary.scss";

const FindLibrary = ({ allLibraries, getAllLibraries }) => {
  const [panToLibrary, setPanToLibrary] = useState(null);

  const panToLibraryLocation = (location) => {
    setPanToLibrary({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    });
  };
  const getLibrary = (lib) => {
    if (lib) {
      panToLibraryLocation(lib);
    }
  };

  return (
    <div className="find-library-container">
      {" "}
      <h2 id="find-library-title">
        Find a Library{" "}
        <span role="img" aria-label="books">
          📚
        </span>{" "}
      </h2>
      <p>OR add a library by tapping on the map!</p>
      <p>Tap again to add library info.</p>
      <Map
        allLibraries={allLibraries}
        getAllLibraries={getAllLibraries}
        panToLibrary={panToLibrary}
      />
      <LibraryList
        allLibraries={allLibraries}
        getAllLibraries={getAllLibraries}
        getLibrary={getLibrary}
      />
    </div>
  );
};

export default FindLibrary;
