import React from "react";
import { Link } from "react-router-dom";
import "./LibraryList.scss";

const LibraryList = ({ allLibraries }) => {
  console.log("librarylist", allLibraries);
  let displayLibraries = <h2>Loading...</h2>;

  if (allLibraries[0]) {
    displayLibraries = allLibraries.map((library) => {
      return (
        <Link key={library.id} to={`/libraries/${library.id}`}>
          <p>{library.name}</p>
        </Link>
      );
    });
  }
  return <div>{displayLibraries}</div>;
};

export default LibraryList;
