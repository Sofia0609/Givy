import { useState } from "react";
import "./comments.css";
import Comment from "../comment/Comment";
import InputComment from "../inputComments/InputComments";

interface CommentData {
  user: string;
  avatar: string;
  text: string;
}

function Comments() {
  const [comments, setComments] = useState<CommentData[]>([]);

  return (
    <div className="comments">
      {comments.map((c, i) => (
        <Comment key={i} user={c.user} avatar={c.avatar} text={c.text} />
      ))}
      <InputComment
        onSubmit={(text) =>
          setComments([...comments, { user: "Tú", avatar: "/assets/avatar.png", text }])
        }
      />
    </div>
  );
}

export default Comments;
