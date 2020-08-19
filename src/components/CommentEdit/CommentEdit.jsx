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
    <div className="comment-edit">
      {editMode ? (
        <form onSubmit={updateComment}>
          <label htmlFor="update-comment">Edit text: </label>
          <input
            onChange={handleEditChange}
            name="update-comment"
            type="text"
            value={userText}
          />
          <button className="update-button" type="submit">
            Update
          </button>
        </form>
      ) : null}
      <button className="icon-edit-button" onClick={handleCommentEdit}>
        <img
          src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597795986/LibreLibro%20Assets/icons8-pencil-48_1_z3rcsy.png"
          alt="edit-button"
          width="20px"
        />
      </button>
      <button className="icon-edit-button" onClick={handleCommentDelete}>
        {" "}
        <img
          src="https://res.cloudinary.com/gaseir526-tashiono/image/upload/v1597795992/LibreLibro%20Assets/icons8-trash-48_vip1jp.png"
          alt="delete-button"
          width="20px"
        />
      </button>
    </div>
  );
};

export default CommentEdit;
