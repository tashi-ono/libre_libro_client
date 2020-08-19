import React from "react";
// import { Redirect } from "react-router-dom";
import apiUrl from "../../apiConfig";
import axios from "axios";
import "./LibraryDelete.scss";

const LibraryDelete = ({ library, getAllLibraries, updateDeletedMarker }) => {
  // const [isDeleted, setIsDeleted] = useState(false);
  // console.log("library delete", library);
  const handleLibraryDelete = async (event) => {
    event.preventDefault();
    let confirmDelete = window.confirm(
      "You sure you want to delete this library?"
    );
    // console.log("confirm delete", confirmDelete);
    if (confirmDelete === true) {
      try {
        await axios.delete(`${apiUrl}/libraries/${library.id}`);
        // setIsDeleted(true);
        getAllLibraries();
        updateDeletedMarker();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // if (isDeleted) {
  //   updateDeletedMarker();
  //   getAllLibraries();
  //   // Need to render new map instance upon library deletion without resetting to default center
  //   // return window.location.reload();
  //   // return <Redirect to="/" />;
  //   // Create delete marker function to capture deletion in UI
  // }
  return (
    // <button className="library-delete-button" onClick={handleLibraryDelete}>
    //   Delete Library
    // </button>

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
