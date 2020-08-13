import React from "react";
// import LibraryForm from "../LibraryForm/LibraryForm";
import Map from "../Map/Map";
import LibraryList from "../LibraryList/LibraryList";
import "./FindLibrary.scss";

// Change library form to modal

const FindLibrary = ({ allLibraries }) => {
  return (
    <div>
      {" "}
      <h2>
        Find a Library{" "}
        <span role="img" aria-label="books">
          📚
        </span>{" "}
      </h2>
      {/* <LibraryForm /> */}
      <Map allLibraries={allLibraries} />
      <LibraryList allLibraries={allLibraries} />
    </div>
  );
};

export default FindLibrary;
