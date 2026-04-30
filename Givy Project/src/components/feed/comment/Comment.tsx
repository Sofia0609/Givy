
import "./comment.css";

interface Props {
  user: string;
  avatar: string;
  text: string;
  reply?: string;
}

function Comment({ user, avatar, text, reply }: Props) {
  return (
    <div className="comment">
      <img src={avatar} alt={user} className="comment-avatar" />
      <div className="comment-body">
        <h4>{user}</h4>
        <p>{text}</p>
        {reply && <p className="comment-reply">↳ {reply}</p>}
      </div>
    </div>
  );
}

export default Comment;
