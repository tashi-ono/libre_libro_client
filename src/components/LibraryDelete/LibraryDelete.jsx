import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./LibraryDelete.scss";

const LibraryDelete = ({ library, getAllLibraries }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  console.log("library delete", library);
  const handleLibraryDelete = async (event) => {
    event.preventDefault();
    let confirmDelete = window.confirm(
      "You sure you want to delete this library?"
    );
    // console.log("confirm delete", confirmDelete);
    if (confirmDelete === true) {
      console.log("handle comment delete", library);
      try {
        await axios.delete(`http://localhost:3000/libraries/${library.id}`);
        // redirect to libraries page
        getAllLibraries();
        setIsDeleted(true);
      } catch (err) {
        console.error(err);
      }
    }
  };
  if (isDeleted) {
    return <Redirect to="/libraries" />;
  }
  return <button onClick={handleLibraryDelete}>Delete Library</button>;
};

export default LibraryDelete;
