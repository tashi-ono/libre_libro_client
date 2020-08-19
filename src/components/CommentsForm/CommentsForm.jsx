import React, { useState } from "react";
import apiUrl from "../../apiConfig";
import "./CommentsForm.scss";
import axios from "axios";
// DONT FORGET TO ADD VALUE!

const CommentsForm = ({ library, getAllLibraries }) => {
  // console.log("comment form props", library);
  const [commentInput, setCommentInput] = useState({
    username: "",
    user_comments: "",
  });
  const handleCommentChange = (event) => {
    // console.log("comment changes", event.target.value);
    setCommentInput({
      ...commentInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // console.log("handle comment submit", event.target);
    addComment(commentInput);
    setCommentInput({ username: "", user_comments: "" });
  };

  const addComment = async (commentObj) => {
    // console.log("commentObj", commentObj);
    try {
      await axios.post(
        `${apiUrl}/libraries/${library.id}/comments`,
        commentObj
      );
      getAllLibraries();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="comment-form">
      <form onSubmit={handleCommentSubmit}>
        <div>
          <label htmlFor="username">
            <b>Add username:</b>{" "}
          </label>
        </div>
        <input
          type="text"
          name="username"
          placeholder="username (required)"
          onChange={handleCommentChange}
          value={commentInput.username}
          required
        />
        <br />

        <label htmlFor="user_comments"></label>

        <textarea
          name="user_comments"
          type="text"
          placeholder="Enter comment here..."
          rows="10"
          cols="40"
          onChange={handleCommentChange}
          value={commentInput.user_comments}
          required
        ></textarea>
        <div>
          <button className="comment-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
