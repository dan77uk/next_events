import { useState, useEffect } from "react";
const axios = require("axios");

import CommentList from "./commentList";
import NewComment from "./newComment";
import classes from "./comments.module.css";

export default function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      axios
        .get(`/api/comments/${eventId}`)
        .then(({ data }) => {
          setComments(data.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    axios
      .post(`/api/comments/${eventId}`, { commentData })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}
