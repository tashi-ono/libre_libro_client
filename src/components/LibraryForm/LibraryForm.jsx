import React from "react";
import "./LibraryForm.scss";
// DON'T FORGET TO ADD VALUE!
const LibraryForm = () => {
  return (
    <>
      <p>Add New Library Info</p>
      <form>
        <label htmlFor="name"></label>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <label htmlFor="location-details"></label>
        <input
          type="text"
          name="location-details"
          placeholder="Location Details"
        />
        <br />
        <label htmlFor="library-img">Library Pic:</label>
        <br />
        <input type="file" name="library-img" accept="image/*" />
        <br />
        <label htmlFor="preview">Image Preview:</label>
        <br />
        <img id="preview" width="50" src="" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LibraryForm;
