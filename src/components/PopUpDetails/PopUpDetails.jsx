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

    console.log("found library", foundLibrary);
    if (foundLibrary[0].name === null || undefined) {
      displayLibrary = (
        <>
          <LibraryForm
            foundLibrary={foundLibrary[0]}
            getAllLibraries={getAllLibraries}
          />

          {/* Unable to use LibraryDelete component here without erroring out. */}
          <Link to={`/libraries/${foundLibrary[0].id}`}>
            <button>Add Comments or Delete Library</button>
          </Link>
        </>
      );
    } else {
      displayLibrary = foundLibrary.map((library) => {
        return (
          <div className="pop-up-container" key={library.id}>
            <img src={library.img} alt="library-img" width="100px" />
            <div className="pop-up-text">
              <Link to={`/libraries/${library.id}`}>
                <b>{library.name ? library.name : "Add a name"}</b>
              </Link>
              <br />
              <p>
                <b>Location Details: </b>
                {library.details}
              </p>
            </div>
          </div>
        );
      });
    }
  }
  return <>{displayLibrary}</>;
};

export default PopUpDetails;
