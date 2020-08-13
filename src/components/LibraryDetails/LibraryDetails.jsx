import React from "react";
import { Link } from "react-router-dom";
import "./LibraryDetails.scss";
import LibraryForm from "../LibraryForm/LibraryForm";

const LibraryDetails = ({ selectedMarker, allLibraries }) => {
  console.log("library details props", selectedMarker, allLibraries);

  // if selected marker latlng matches one in allLibraries, then render the info from allLibraries array
  let displayLibrary;
  if (allLibraries && selectedMarker) {
    let foundLibrary = allLibraries.filter(
      (library) => parseFloat(library.lat) === parseFloat(selectedMarker.lat)
    );

    if (!foundLibrary[0].name) {
      displayLibrary = <LibraryForm />;
    } else {
      displayLibrary = foundLibrary.map((library) => {
        return (
          <div key={library.id}>
            <Link to={`/library/${library.id}`}>
              <b>{library.name}</b>
            </Link>
            <p>
              <b>Location Details: </b>
              {library.details}
            </p>
          </div>
        );
      });
    }
  }
  return <>{displayLibrary}</>;
};

export default LibraryDetails;
