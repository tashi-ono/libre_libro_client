import React, { useState } from "react";
import apiUrl from "../../apiConfig";
import "./CommentsForm.scss";
import axios from "axios";

const CommentsForm = ({ library, getAllLibraries }) => {
  const [commentInput, setCommentInput] = useState({
    username: "",
    user_comments: "",
  });

    setCommentInput({
      ...commentInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    addComment(commentInput);
    setCommentInput({ username: "", user_comments: "" });
  };

  const addComment = async (commentObj) => {
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
