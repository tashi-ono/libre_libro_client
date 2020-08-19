import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import CommentEdit from "../CommentEdit/CommentEdit";
import CommentsForm from "../CommentsForm/CommentsForm";
import LibraryForm from "../LibraryForm/LibraryForm";
import apiUrl from "../../apiConfig";
// import LibraryDelete from "../LibraryDelete/LibraryDelete";
import "./LibraryPage.scss";
import axios from "axios";

const LibraryPage = ({ match, getAllLibraries }) => {
  // console.log("match library page", match);
  const [library, setLibrary] = useState([]);
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getALibrary = async () => {
      try {
        let res = await axios.get(`${apiUrl}/libraries/${match.params.id}`);
        // console.log("get a library details", res.data);
        // console.log("get comments", res.data.comments);
        setLibrary(res.data);
        setComments(res.data.comments);
      } catch (err) {
        console.error(err);
      }
    };

    getALibrary();
  }, [match]);

  let displayComments = <p>No comments add yet!</p>;
  if (comments.length > 0) {
    displayComments = comments.map((comment) => {
      let formattedDate = format(
        new Date(comment.created_at),
        "MM/dd/yyyy @ pp"
      );
      // console.log("time", comment.created_at);

      return (
        <div
          className="comment-text"
          key={`${Date.parse(formattedDate)} + ${comment.id}`}
        >
          <p className="username-time">
            <span className="username">{comment.username}</span> originally
            posted on: <br /> {formattedDate}{" "}
          </p>
          <p>{comment.user_comments}</p>
          <CommentEdit comment={comment} getAllLibraries={getAllLibraries} />
        </div>
      );
    });
  }
  return (
    <div className="library-page" key={`lib${library.id}`}>
      <h2>Library Details</h2>
      <img
        className="library-img"
        src={`${library.img}`}
        alt={library.img ? `broken-link-to-library-image` : ""}
        width="300"
      />
      <h3>
        <b>{library.name}</b>
      </h3>

      {library.details ? (
        <div className="library-details">
          <p>
            <b>Location Details: </b>
          </p>
          <p>{library.details}</p>
        </div>
      ) : (
        <p>No details added yet!</p>
      )}
      <button
        className="edit-library-button"
        onClick={() => setShowForm(!showForm)}
      >
        Edit Library
      </button>
      {showForm ? (
        <LibraryForm
          getAllLibraries={getAllLibraries}
          foundLibrary={library}
          setShowForm={setShowForm}
        />
      ) : null}
      {displayComments}
      <CommentsForm library={library} getAllLibraries={getAllLibraries} />
    </div>
  );
};

export default LibraryPage;
