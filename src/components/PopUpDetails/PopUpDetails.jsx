import React from "react";
import { Link } from "react-router-dom";
import "./PopUpDetails.scss";
import LibraryForm from "../LibraryForm/LibraryForm";

const PopUpDetails = ({ selectedMarker, allLibraries, getAllLibraries }) => {
  console.log("library details props", selectedMarker, allLibraries);

  // if selected marker latlng matches one in allLibraries, then render the info from allLibraries array
  let displayLibrary;
  if (allLibraries && selectedMarker) {
    let foundLibrary = allLibraries.filter(
      (library) => parseFloat(library.lat) === parseFloat(selectedMarker.lat)
    );

    if (!foundLibrary[0].name) {
      displayLibrary = (
        <LibraryForm
          foundLibrary={foundLibrary}
          getAllLibraries={getAllLibraries}
        />
      );
    } else {
      displayLibrary = foundLibrary.map((library) => {
        return (
          <div key={library.id}>
            <Link to={`/libraries/${library.id}`}>
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

export default PopUpDetails;
