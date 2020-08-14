import React, { useState } from "react";
import axios from "axios";
import "./LibraryForm.scss";
// DON'T FORGET TO ADD VALUE!
const LibraryForm = ({ foundLibrary, getAllLibraries }) => {
  console.log("library form found library", foundLibrary);
  const [userInput, setUserInput] = useState({
    id: "",
    name: "",
    details: "",
    img: "",
  });

  const handleChange = (event) => {
    console.log("handle change", event.target.value);
    setUserInput({
      ...userInput,
      id: foundLibrary[0].id,
      [event.target.name]: event.target.value,
    });
  };

  // Must refactor to allow file upload to cloud storage via Firebase(?)
  // const handleFileUpload = (event) => {
  //   console.log("handlefileupload", event.target.files[0]);
  //   setUserInput({ ...userInput, [event.target.name]: event.target.files[0] });
  // };
  const handleSubmit = (event) => {
    console.log("handle submit", event.target);
    event.preventDefault();
    updateLibrary(userInput);
    setUserInput({ id: "", name: "", details: "", img: "" });
  };

  const updateLibrary = async (libraryObj) => {
    console.log("library obj", libraryObj);
    try {
      await axios.put(
        `http://localhost:3000/libraries/${libraryObj.id}`,
        libraryObj
      );
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <p>Add New Library Info</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={userInput.name}
          required
        />
        <br />

        <label htmlFor="details"></label>
        <input
          type="text"
          name="details"
          placeholder="Location Details"
          onChange={handleChange}
          value={userInput.details}
        />
        <br />

        <label htmlFor="img"></label>
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          onChange={handleChange}
          value={userInput.img}
        />
        {/* <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleFileUpload}
          value={userInput.img}
        /> */}

        <br />

        <label htmlFor="preview"></label>
        <br />

        <img name="preview" width="50" src={userInput.img} alt="library-img" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LibraryForm;
