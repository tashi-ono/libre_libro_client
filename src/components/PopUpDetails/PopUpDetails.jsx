import React, { useState } from "react";
import { Link } from "react-router-dom";
import LibraryDelete from "../LibraryDelete/LibraryDelete";
import "./PopUpDetails.scss";

const PopUpDetails = ({ selectedMarker, allLibraries, getAllLibraries }) => {
  const [isMarkerDeleted, setIsMarkerDeleted] = useState(false);

  const updateDeletedMarker = () => {
    console.log("handle marker delete");
    setIsMarkerDeleted(true);
  };

  // if selected marker latlng matches one in allLibraries, then render the info from allLibraries array
  let displayLibrary;
  if (allLibraries && selectedMarker) {
    let foundLibrary = allLibraries.filter(
      (library) => parseFloat(library.lat) === parseFloat(selectedMarker.lat)
    );

    if (selectedMarker) {
      displayLibrary = foundLibrary.map((library) => {
        return (
          <div className="pop-up-container" key={library.id}>
            {library.img ? (
              <img src={library.img} alt="library-img" width="100px" />
            ) : null}

            <div className="pop-up-text">
              <Link to={`/libraries/${library.id}`}>
                {library.name ? (
                  library.name
                ) : (
                  <button className="icon-edit-button">
                    <img
                      src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597795986/LibreLibro%20Assets/icons8-pencil-48_1_z3rcsy.png"
                      alt="edit-button"
                      width="20px"
                    />
                  </button>
                )}
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
