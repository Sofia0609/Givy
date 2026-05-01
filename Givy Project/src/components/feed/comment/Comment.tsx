import "./Comment.css";

interface Props {
  user: string;
  avatar: string;
  text: string;
  replies?: number;
}

function Comment({ user, avatar, text, replies = 0 }: Props) {
  const initial = user.charAt(0).toUpperCase();

  return (
    <div className="comment">
      {/* Avatar con inicial */}
      <div className="comment-avatar" aria-label={user}>
        {avatar ? (
          <img src={avatar} alt={user} />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      <div className="comment-body">
        <h4 className="comment-user">{user}</h4>
        <p className="comment-text">{text}</p>
        {replies > 0 && (
          <button className="comment-replies">
            Ver {replies} respuesta{replies !== 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;