import React, { useState } from "react";
import axios from "axios";
import apiUrl from "../../apiConfig";
import "./CommentEdit.scss";

const CommentEdit = ({ comment, getAllLibraries }) => {
  const [editMode, setEditMode] = useState(false);
  const [userText, setUserText] = useState("");

  const handleCommentEdit = (event) => {
    console.log("handle edit", comment);
    setEditMode(!editMode);
  };

  const handleEditChange = (event) => {
    console.log("handle edit change", event.target.value);
    setUserText(event.target.value);
  };
  const updateComment = async (event) => {
    console.log("handle update submit", comment);
    event.preventDefault();
    try {
      await axios.put(`${apiUrl}/comments/${comment.id}`, {
        user_comments: userText,
      });
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }
    setUserText("");
    setEditMode(false);
  };

  // Confirms if you want to delete a comment with an alert window
  const handleCommentDelete = async (event) => {
    let confirmDelete = window.confirm("You sure you want to delete comment?");
    // console.log("confirm delete", confirmDelete);
    if (confirmDelete === true) {
      console.log("handle comment delete", comment);
      try {
        await axios.delete(`${apiUrl}/comments/${comment.id}`);
        getAllLibraries();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      {editMode ? (
        <form onSubmit={updateComment}>
          <label htmlFor="update-comment">Edit text: </label>
          <input
            onChange={handleEditChange}
            name="update-comment"
            type="text"
            value={userText}
          />
          <button type="submit">Update</button>
        </form>
      ) : null}
      <button onClick={handleCommentEdit}>Edit</button>
      <button onClick={handleCommentDelete}>Delete</button>
    </div>
  );
};

export default CommentEdit;
