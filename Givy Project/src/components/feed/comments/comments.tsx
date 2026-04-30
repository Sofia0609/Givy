import React, { useState, useEffect } from "react";
import "./comments.css";
import commentIcon from "../../../assets/comment_icon.svg";

interface Comment {
  name: string;
  comment: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch("./comments.json")
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  return (
    <div className="comments_container">
      <button className="comments_button">
        <img src={commentIcon} alt="comments" />
      </button>
      {comments.map((c, i) => (
        <div key={i} className="CommentSection">
          <div className="profile_Picture_Comments">{c.name.charAt(0)}</div>
          <div className="user-info">
            <h4>{c.name}</h4>
            <p>{c.comment}</p>
          </div>
        </div>
      ))}
      <div className="input_section">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agregar comentario..."
        />
        <button
          className="submit_button"
          onClick={() => {
            if (newComment.trim() !== "") {
              setComments([...comments, { name: "Tu", comment: newComment }]);
              setNewComment("");
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Comments;

