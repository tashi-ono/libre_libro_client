import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import CommentEdit from "../CommentEdit/CommentEdit";
import CommentsForm from "../CommentsForm/CommentsForm";
import LibraryForm from "../LibraryForm/LibraryForm";
import LibraryDelete from "../LibraryDelete/LibraryDelete";
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
        let res = await axios.get(
          `http://localhost:3000/libraries/${match.params.id}`
        );
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
        <div key={`${Date.parse(formattedDate)} + ${comment.id}`}>
          <p>
            <b>
              {comment.username} posted on {formattedDate}{" "}
            </b>
          </p>
          <p>{comment.user_comments}</p>
          <CommentEdit comment={comment} getAllLibraries={getAllLibraries} />
        </div>
      );
    });
  }
  return (
    <div key={`lib${library.id}`}>
      <button onClick={() => setShowForm(!showForm)}>
        Edit Library Details
      </button>
      {showForm ? (
        <LibraryForm getAllLibraries={getAllLibraries} foundLibrary={library} />
      ) : null}
      <LibraryDelete library={library} getAllLibraries={getAllLibraries} />
      <p>{library.name}</p>
      <img
        src={`${library.img}`}
        alt={library.img ? `broken-link-to-library-image` : ""}
        width="300"
      />
      <p>Location Details: {library.details}</p>
      {displayComments}
      <CommentsForm library={library} getAllLibraries={getAllLibraries} />
    </div>
  );
};

export default LibraryPage;
