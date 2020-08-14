import React from "react";
import { Link } from "react-router-dom";
import "./LibraryList.scss";

const LibraryList = ({ allLibraries, getAllLibraries }) => {
  // console.log("librarylist", allLibraries);
  let displayLibraries = <h2>Loading...</h2>;

  if (allLibraries[0]) {
    displayLibraries = allLibraries.map((library) => {
      return (
        <Link key={library.id} to={`/libraries/${library.id}`}>
          <span>{library.name}</span>
        </Link>
      );
    });
  }
  return <div>{displayLibraries}</div>;
};

export default LibraryList;
