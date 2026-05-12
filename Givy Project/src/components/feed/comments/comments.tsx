import { useState, useRef } from "react";
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
  onAddReply: (commentId: string, text: string) => void;
  loggedUserId: string;
}

function Comments({ comments, onClose, onAddComment, onDeleteComment, onAddReply, loggedUserId }: Props) {
  const [inputText, setInputText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  // null = comentando normal, string = respondiendo a ese commentId
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Al hacer doble click en un comentario — cambia el modo del input
  const handleDoubleClick = (commentId: string) => {
    setReplyingToId(commentId);
    setInputText("");
    // Foco al input
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const cancelReply = () => {
    setReplyingToId(null);
    setInputText("");
  };

  const handleSubmit = () => {
    if (!inputText.trim()) return;

    if (replyingToId) {
      // Modo respuesta
      onAddReply(replyingToId, inputText.trim());
      setExpandedReplies((prev) => ({ ...prev, [replyingToId]: true }));
      setReplyingToId(null);
    } else {
      // Modo comentario normal
      onAddComment(inputText.trim());
    }
    setInputText("");
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  // Un comentario es propio si isOwn=true O si su userId es el del usuario logueado
  const isOwnComment = (c: CommentData) =>
    c.isOwn === true || c.userId === loggedUserId;

  return (
    <div className="comments-sheet" onClick={() => setMenuOpenId(null)}>

      {/* Header */}
      <div className="comments-header">
        <div className="comments-handle" />
        <span className="comments-title">{comments.length} comentarios</span>
        <button className="comments-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>

      {/* Lista */}
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

              <div
                className={`comment-row ${replyingToId === c.id ? "comment-row--replying" : ""}`}
                onDoubleClick={() => handleDoubleClick(c.id)}
                title="Doble click para responder"
              >
                <div className="comment-avatar">
                  <span>
                    {resolveUsername(c.userId).charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="comment-body">
                  <h4 className="comment-user">{resolveUsername(c.userId)}</h4>
                  <p className="comment-text">{c.text}</p>

                  {replyingToId === c.id && (
                    <span className="reply-hint">
                      Respondiendo... <button className="reply-cancel-inline" onClick={cancelReply}>Cancelar</button>
                    </span>
                  )}

                  {c.replies.length > 0 && (
                    <button
                      className="comment-replies-btn"
                      onClick={(e) => { e.stopPropagation(); toggleReplies(c.id); }}
                    >
                      {expandedReplies[c.id]
                        ? "Ocultar respuestas"
                        : `Ver ${c.replies.length} respuesta${c.replies.length !== 1 ? "s" : ""}`}
                    </button>
                  )}
                </div>

                {/* Menú 3 puntos — solo para comentarios del usuario logueado */}
                {isOwnComment(c) && (
                  <div
                    className="comment-menu-wrapper"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === c.id ? null : c.id);
                    }}
                  >
                    <button className="comment-menu-btn" aria-label="opciones">···</button>
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
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Respuestas expandibles */}
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

      {/* Input único — cambia entre modo comentario y modo respuesta */}
      <div className="comments-input-row">
        <div className="comments-input-avatar" />
        <input
          ref={inputRef}
          className="comments-input"
          type="text"
          placeholder={
            replyingToId
              ? `Respondiendo a ${resolveUsername(comments.find(c => c.id === replyingToId)?.userId ?? "")}...`
              : "Agregar comentario..."
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") cancelReply();
          }}
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