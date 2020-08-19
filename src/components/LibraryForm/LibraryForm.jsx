import React, { useState } from "react";
import apiUrl from "../../apiConfig";
import axios from "axios";
import "./LibraryForm.scss";

const LibraryForm = ({ foundLibrary, getAllLibraries, setShowForm }) => {
  const [userInput, setUserInput] = useState(
    { ...foundLibrary } || {
      name: "",
      details: "",
      img: "",
    }
  );

  // If no change was submitted for certain input fields, how do we prevent them from being updated to an empty string?
  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateLibrary(userInput);
    setShowForm(false);
  };

  const updateLibrary = async (libraryObj) => {
    try {
      await axios.put(`${apiUrl}/libraries/${libraryObj.id}`, libraryObj);
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="library-form-container">
      <p>Add Library Info</p>
      <form className="library-form" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default LibraryForm;
