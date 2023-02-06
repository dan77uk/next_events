import { useState, useEffect, useContext } from "react";
const axios = require("axios");

import CommentList from "./commentList";
import NewComment from "./newComment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notificationContext";

export default function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(true);
  const notificationCTX = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      axios
        .get(`/api/comments/${eventId}`)
        .then(({ data }) => {
          setComments(data.comments);
          setIsFetchingComments(false);
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
    notificationCTX.showNotification({
      title: "Sending comment...",
      message: "Posting your comment...",
      status: "pending",
    });
    axios
      .post(`/api/comments/${eventId}`, { commentData })
      .then((response) => {
        notificationCTX.showNotification({
          title: "Success!",
          message: "Your comment has been succesfully stored.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCTX.showNotification({
          title: "Error!",
          message: error || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading Comments</p>}
    </section>
  );
}
