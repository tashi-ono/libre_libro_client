import React from "react";
import apiUrl from "../../apiConfig";
import axios from "axios";
import "./LibraryDelete.scss";

const LibraryDelete = ({ library, getAllLibraries, updateDeletedMarker }) => {
  const handleLibraryDelete = async (event) => {
    event.preventDefault();
    let confirmDelete = window.confirm(
      "You sure you want to delete this library?"
    );
    if (confirmDelete === true) {
      try {
        await axios.delete(`${apiUrl}/libraries/${library.id}`);
        getAllLibraries();
        updateDeletedMarker();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <button className="icon-edit-button" onClick={handleLibraryDelete}>
      <img
        src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597795992/LibreLibro%20Assets/icons8-trash-48_vip1jp.png"
        alt="delete-button"
        width="20px"
      />
    </button>
  );
};

export default LibraryDelete;
