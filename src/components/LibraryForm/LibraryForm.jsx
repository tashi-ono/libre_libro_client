import React, { useState } from "react";
import apiUrl from "../../apiConfig";
import axios from "axios";
import "./LibraryForm.scss";
// DON'T FORGET TO ADD VALUE!
const LibraryForm = ({ foundLibrary, getAllLibraries }) => {
  // console.log("library form found library", foundLibrary);
  const [userInput, setUserInput] = useState(
    { ...foundLibrary } || {
      name: "",
      details: "",
      img: "",
    }
  );

  // If no change was submitted for certain input fields, how do we prevent them from being updated to an empty string?
  const handleChange = (event) => {
    // console.log("handle change from libraryform", event.target.value);
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // console.log("handle submit from libraryform", event.target.name);
    event.preventDefault();
    updateLibrary(userInput);
  };

  const updateLibrary = async (libraryObj) => {
    // console.log("library obj", libraryObj);
    try {
      await axios.put(`${apiUrl}/libraries/${libraryObj.id}`, libraryObj);
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <p>Add Library Info</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={userInput.name ? userInput.name : ""}
          required
        />
        <br />

        <label htmlFor="details"></label>
        <input
          type="text"
          name="details"
          placeholder="Location Details"
          onChange={handleChange}
          value={userInput.details ? userInput.details : ""}
        />
        <br />

        <label htmlFor="img"></label>
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          onChange={handleChange}
          value={userInput.img ? userInput.img : ""}
        />

        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LibraryForm;
