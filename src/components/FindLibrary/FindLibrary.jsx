import React, { useState } from "react";
// import LibraryForm from "../LibraryForm/LibraryForm";
import Map from "../Map/Map";
import LibraryList from "../LibraryList/LibraryList";
import "./FindLibrary.scss";

// Change library form to modal

const FindLibrary = ({ allLibraries, getAllLibraries }) => {
  // console.log("findlibrary", allLibraries);
  const [panToLibrary, setPanToLibrary] = useState(null);

  const panToLibraryLocation = (location) => {
    // console.log("inside panToLibrary", location);
    setPanToLibrary({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    });
  };
  // console.log(" pan to library location", panToLibrary);
  const getLibrary = (lib) => {
    // console.log("pan to from map", lib);
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
      {/* <LibraryForm /> */}
      <Map
        allLibraries={allLibraries}
        getAllLibraries={getAllLibraries}
        // getLibrary={getLibrary}
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
