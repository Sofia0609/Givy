import { useState } from "react";
import "./Comments.css";
import Comment from "../comment/Comment";
import avatarImg from "../../../assets/avatar.png";

interface CommentData {
  id: number;
  user: string;
  avatar: string;
  text: string;
  replies: number;
}

// Comentarios de ejemplo — reemplaza con fetch a tu JSON
const initialComments: CommentData[] = [
  { id: 1, user: "Valentine Bustamante", avatar: "", text: "Me encantaaaa, siempre había querido un profesor con tu carisma!!😄", replies: 10 },
  { id: 2, user: "Jose David Cardenas",  avatar: "", text: "OMGGGG por fín alguien explicando el tema de mi examennnn 😄😄", replies: 1 },
  { id: 3, user: "Christopher Argumero", avatar: "", text: "Explicas temas de universidad avanzada?? 🤔", replies: 16 },
];

interface Props {
  onClose: () => void;
}

function Comments({ onClose }: Props) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), user: "Tú", avatar: "", text: inputText.trim(), replies: 0 },
    ]);
    setInputText("");
  };

  return (
    <div className="comments-sheet">
      {/* Handle + header */}
      <div className="comments-header">
        <div className="comments-handle" />
        <span className="comments-title">{comments.length} comentarios</span>
        <button className="comments-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>

      {/* Lista de comentarios (scrollable) */}
      <div className="comments-list">
        {comments.map((c) => (
          <Comment
            key={c.id}
            user={c.user}
            avatar={c.avatar || avatarImg}
            text={c.text}
            replies={c.replies}
          />
        ))}
      </div>

      {/* Input fijo abajo */}
      <div className="comments-input-row">
        <div className="comments-input-avatar" />
        <input
          className="comments-input"
          type="text"
          placeholder="Agregar comentario..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button className="comments-emoji-btn" aria-label="emoji">🙂</button>
        <button className="comments-emoji-btn" aria-label="sticker">🎭</button>
      </div>
    </div>
  );
}

export default Comments;