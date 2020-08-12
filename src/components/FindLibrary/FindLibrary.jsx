import React from "react";
import Map from "../Map/Map";
import "./FindLibrary.scss";

const FindLibrary = () => {
  return (
    <div>
      {" "}
      <h2>
        Find a Library{" "}
        <span role="img" aria-label="books">
          📚
        </span>{" "}
      </h2>
      <Map />
    </div>
  );
};

export default FindLibrary;
