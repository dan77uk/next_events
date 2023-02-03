import classes from "./commentList.module.css";

export default function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
