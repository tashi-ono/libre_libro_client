import React, { useState } from "react";
import { Link } from "react-router-dom";
import LibraryDelete from "../LibraryDelete/LibraryDelete";
import "./PopUpDetails.scss";
// import LibraryForm from "../LibraryForm/LibraryForm";

const PopUpDetails = ({ selectedMarker, allLibraries, getAllLibraries }) => {
  // console.log("library details props", selectedMarker, allLibraries);

  const [isMarkerDeleted, setIsMarkerDeleted] = useState(false);

  const updateDeletedMarker = () => {
    console.log("handle marker delete");
    setIsMarkerDeleted(true);
    // getAllLibraries();
  };

  // if selected marker latlng matches one in allLibraries, then render the info from allLibraries array
  let displayLibrary;
  if (allLibraries && selectedMarker) {
    let foundLibrary = allLibraries.filter(
      (library) => parseFloat(library.lat) === parseFloat(selectedMarker.lat)
    );

    // console.log("found library", foundLibrary);
    if (selectedMarker) {
      displayLibrary = foundLibrary.map((library) => {
        return (
          <div className="pop-up-container" key={library.id}>
            {library.img ? (
              <img src={library.img} alt="library-img" width="100px" />
            ) : null}

            <div className="pop-up-text">
              <Link to={`/libraries/${library.id}`}>
                {library.name ? library.name : <button>Edit Library</button>}
              </Link>
              <br />
              <p>
                {library.details ? (
                  <>
                    <b>Location Details: </b> {library.details}
                  </>
                ) : null}
              </p>
            </div>
            <LibraryDelete
              library={library}
              getAllLibraries={getAllLibraries}
              updateDeletedMarker={updateDeletedMarker}
            />
          </div>
        );
      });
    }
  }
  return (
    <>{isMarkerDeleted ? <p>Deleted...Please close box</p> : displayLibrary}</>
  );
};

export default PopUpDetails;
