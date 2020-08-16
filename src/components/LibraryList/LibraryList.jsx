import React from "react";
// import { Link } from "react-router-dom";
import "./LibraryList.scss";

const LibraryList = ({ allLibraries, getLibrary }) => {
  // console.log("librarylist", allLibraries);

  let displayLibraries = <h2>Loading...</h2>;

  if (allLibraries[0]) {
    displayLibraries = allLibraries.map((library) => {
      getLibrary();

      // getLocation = (event) => {
      //   console.log("location event", event.target.innerHTML);
      //   let panLibrary = allLibraries.filter(
      //     (lib) => lib.name === event.target.innerHTML
      //   );
      //   setPanToLocation({
      //     lat: parseFloat(panLibrary[0].lat),
      //     lng: parseFloat(panLibrary[0].lng),
      //   });
      //  };
      console.log("library list", library);
      return (
        // <Link key={library.id} to={`/libraries/${library.id}`}>
        //   <span>{library.name ? library.name : "New Library - Add info"}</span>
        // </Link>

        <span key={library.id} onClick={() => getLibrary(library)}>
          {library.name ? library.name : "New Library - Add info"}
        </span>
      );
    });
  }
  // console.log("pan location", panToLocation);
  return <div>{displayLibraries}</div>;
};

export default LibraryList;
