import React from "react";
import { Link } from "react-router-dom";
import "./PopUpDetails.scss";
// import LibraryForm from "../LibraryForm/LibraryForm";

const PopUpDetails = ({ selectedMarker, allLibraries, getAllLibraries }) => {
  console.log("library details props", selectedMarker, allLibraries);

  // if selected marker latlng matches one in allLibraries, then render the info from allLibraries array
  let displayLibrary;
  if (allLibraries && selectedMarker) {
    let foundLibrary = allLibraries.filter(
      (library) => parseFloat(library.lat) === parseFloat(selectedMarker.lat)
    );

    console.log("found library", foundLibrary);
    if (!selectedMarker) {
      displayLibrary = (
        <>
          {/* <LibraryForm
            foundLibrary={foundLibrary[0]}
            getAllLibraries={getAllLibraries}
          /> */}

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
            {library.img ? (
              <img src={library.img} alt="library-img" width="100px" />
            ) : null}

            <div className="pop-up-text">
              <Link to={`/libraries/${library.id}`}>
                {library.name ? (
                  library.name
                ) : (
                  <button>Add Library Info</button>
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
          </div>
        );
      });
    }
  }
  return <>{displayLibrary}</>;
};

export default PopUpDetails;
