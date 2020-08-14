import React, { useState } from "react";
import axios from "axios";
import "./CommentEdit.scss";

const CommentEdit = ({ comment, getAllLibraries }) => {
  // const [editMode, setEditMode] = useState()
  const handleEdit = (event) => {
    console.log("handle comment edit", comment);
  };

  // Confirms if you want to delete a comment with an alert window
  const handleDelete = async (event) => {
    let confirmDelete = window.confirm("You sure you want to delete comment?");
    console.log("confirm delete", confirmDelete);
    if (confirmDelete === true) {
      console.log("handle comment delete", comment);
      try {
        await axios.delete(`http://localhost:3000/comments/${comment.id}`);
        getAllLibraries();
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div>
      {/* <button onClick={handleEdit}>Edit</button> */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CommentEdit;
