import { useState } from "react";
import "./Comments.css";
import shareIcon from "../../../assets/share_icon.svg";
import commentIconAsset from "../../../assets/comment_icon.svg";
import usersData from "../../../data/users.json";
import type { CommentData } from "../../../pages/feed/Feed";

const resolveUsername = (userId: string): string =>
  usersData.find((u) => u.id === userId)?.username ?? userId;

interface Props {
  comments: CommentData[];
  onClose: () => void;
  onAddComment: (text: string) => void;
  onDeleteComment: (commentId: string) => void;
}

function Comments({ comments, onClose, onAddComment, onDeleteComment }: Props) {
  const [inputText, setInputText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    onAddComment(inputText.trim());
    setInputText("");
  };

  const toggleMenu = (id: string) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <div className="comments-sheet" onClick={() => setMenuOpenId(null)}>
      <div className="comments-header">
        <div className="comments-handle" />
        <span className="comments-title">{comments.length} comentarios</span>
        <button className="comments-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="comments-empty">
            <img src={commentIconAsset} alt="sin comentarios" className="comments-empty-icon" />
            <p>No hay comentarios aún.</p>
            <p>¡Sé el primero en comentar!</p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-block">
              <div className="comment-row">
                <div className="comment-avatar">
                  <span>{c.isOwn ? "Tú" : resolveUsername(c.userId).charAt(0).toUpperCase()}</span>
                </div>
                <div className="comment-body">
                  <h4 className="comment-user">{c.isOwn ? "Tú" : resolveUsername(c.userId)}</h4>
                  <p className="comment-text">{c.text}</p>
                  {c.replies.length > 0 && (
                    <button className="comment-replies-btn" onClick={() => toggleReplies(c.id)}>
                      {expandedReplies[c.id]
                        ? "Ocultar respuestas"
                        : `Ver ${c.replies.length} respuesta${c.replies.length !== 1 ? "s" : ""}`}
                    </button>
                  )}
                </div>
                {c.isOwn && (
                  <div className="comment-menu-wrapper" onClick={(e) => { e.stopPropagation(); toggleMenu(c.id); }}>
                    <button className="comment-menu-btn" aria-label="opciones">···</button>
                    {menuOpenId === c.id && (
                      <div className="comment-menu-dropdown">
                        <button
                          className="comment-menu-delete"
                          onClick={(e) => { e.stopPropagation(); onDeleteComment(c.id); setMenuOpenId(null); }}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {expandedReplies[c.id] && c.replies.length > 0 && (
                <div className="replies-list">
                  {c.replies.map((r) => (
                    <div key={r.id} className="reply-row">
                      <div className="reply-avatar">
                        <span>{resolveUsername(r.userId).charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="reply-body">
                        <h4 className="reply-user">{resolveUsername(r.userId)}</h4>
                        <p className="reply-text">{r.text}</p>
                      </div>
                    </div>
                  ))}
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
        <button className="comments-send-btn" onClick={(e) => { e.stopPropagation(); handleSubmit(); }} aria-label="Enviar">
          <img src={shareIcon} alt="Enviar" />
        </button>
      </div>
    </div>
  );
}

export default Comments;