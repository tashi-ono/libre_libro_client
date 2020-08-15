import React from "react";
// import LibraryForm from "../LibraryForm/LibraryForm";
import Map from "../Map/Map";
import LibraryList from "../LibraryList/LibraryList";
import "./FindLibrary.scss";

// Change library form to modal

const FindLibrary = ({ allLibraries, getAllLibraries }) => {
  // console.log("findlibrary", allLibraries);
  return (
    <div>
      {" "}
      <h2>
        Find a Library{" "}
        <span role="img" aria-label="books">
          📚
        </span>{" "}
      </h2>
      <p>OR add a library by tapping on the map!</p>
      <p>Tap again to add library info.</p>
      {/* <LibraryForm /> */}
      <Map allLibraries={allLibraries} getAllLibraries={getAllLibraries} />
      <LibraryList
        allLibraries={allLibraries}
        getAllLibraries={getAllLibraries}
      />
    </div>
  );
};

export default FindLibrary;
