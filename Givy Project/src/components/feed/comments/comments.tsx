import { useState } from "react";
import "./Comments.css";
import shareIcon from "../../../assets/share_icon.svg";
import type { CommentData } from "../../../pages/feed/Feed";

interface Props {
  comments: CommentData[];
  onClose: () => void;
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: string) => void;
}

function Comments({ comments, onClose, onAddComment, onDeleteComment }: Props) {
  const [inputText, setInputText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    onAddComment(inputText.trim());
    setInputText("");
  };

  const toggleMenu = (id: string) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  return (
    <div className="comments-sheet" onClick={() => setMenuOpenId(null)}>

      {/* Header */}
      <div className="comments-header">
        <div className="comments-handle" />
        <span className="comments-title">{comments.length} comentarios</span>
        <button className="comments-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>

  
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="comments-empty">
            <span>💬</span>
            <p>No hay comentarios aún.</p>
            <p>¡Sé el primero en comentar!</p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-row">
              {/* Avatar */}
              <div className="comment-avatar">
                <span>{c.isOwn ? "Tú" : c.userId.charAt(0).toUpperCase()}</span>
              </div>

     
              <div className="comment-body">
                <h4 className="comment-user">{c.isOwn ? "Tú" : c.userId}</h4>
                <p className="comment-text">{c.text}</p>
                {c.replies.length > 0 && (
                  <button className="comment-replies-btn">
                    Ver {c.replies.length} respuesta{c.replies.length !== 1 ? "s" : ""}
                  </button>
                )}
              </div>

             
              {c.isOwn && (
                <div
                  className="comment-menu-wrapper"
                  onClick={(e) => { e.stopPropagation(); toggleMenu(c.id); }}
                >
                  <button className="comment-menu-btn" aria-label="opciones">⋯</button>
                  {menuOpenId === c.id && (
                    <div className="comment-menu-dropdown">
                      <button
                        className="comment-menu-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteComment(c.id);
                          setMenuOpenId(null);
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="comments-input-row">
        <div className="comments-input-avatar" />
        <input
          className="comments-input"
          type="text"
          placeholder="Agregar comentario..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="comments-send-btn"
          onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
          aria-label="Enviar"
        >
          <img src={shareIcon} alt="Enviar" />
        </button>
      </div>

    </div>
  );
}

export default Comments;