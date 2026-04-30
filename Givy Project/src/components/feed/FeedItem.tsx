import React, { useState, useEffect } from "react";
import "../styles/feed.css";
import "../styles/video.css";
import "../styles/sidebarRight.css";
import "../styles/userpanel.css";
import "../styles/modal.css";

interface Comment {
  name: string;
  comment: string;
}

interface FeedItemProps {
  username: string;
  bio: string;
  tags: string[];
  video: string;
  avatar: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ username, bio, tags, video, avatar }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Art");

  // Cargar comentarios desde JSON cuando se abre la sección
  useEffect(() => {
    if (showComments) {
      fetch("./comments.json")
        .then(res => res.json())
        .then(data => setComments(data));
    }
  }, [showComments]);

  return (
    <div className="feed-item">
      {/* Panel de usuario */}
      <section className="user-panel">
        <div className="user-info">
          <h2>@{username}</h2>
          <p>{bio}</p>
        </div>
        <div className="tags">
          {tags.map((tag, i) => (
            <button key={i}>{tag}</button>
          ))}
        </div>
      </section>

      {/* Video */}
      <main className="video-section">
        <div className="video-feed">
          <div className="video-user-top">
            <span>{username}</span>
            <div className="swap-tabs">
              <button
                className={`tab-btn ${activeTab === "Art" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("Art")}
              >
                Art
              </button>
              <button
                className={`tab-btn tab-right ${activeTab === "Music" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("Music")}
              >
                Music
              </button>
            </div>
          </div>

          <div className="video-user-bottom">
            <h3>@{username}</h3>
            <p>{bio}</p>
          </div>

          <section className="video-item">
            <video src={video} muted loop autoPlay />
          </section>
        </div>
      </main>

      {/* Sidebar derecha */}
      <aside className="sidebar-right">
        <div className="avatar">{avatar}</div>

        {/* Like */}
        <button
          className={`like_button ${liked ? "Liked" : ""}`}
          onClick={() => {
            if (liked) {
              setLikeCount(likeCount - 1);
            } else {
              setLikeCount(likeCount + 1);
            }
            setLiked(!liked);
          }}
        >
          
        </button>
        <span className="like_counter">{likeCount}</span>

        {/* Comments */}
        <button className="comments_button" onClick={() => setShowComments(!showComments)}>
          
        </button>

        {/* Share */}
        <button className="share_button" onClick={() => alert("Compartir aún no implementado")}>
          
        </button>

        {/* Swap */}
        <button className="swap_button" onClick={() => setShowModal(true)}>
          
        </button>
      </aside>

      {/* Sección de comentarios */}
      {showComments && (
        <div className="comments_container">
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
      )}

      {/* Modal Swap */}
      {showModal && (
        <div className="swap-modal animation">
          <div className="swap-modal-content">
            <button className="swap-modal-close" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <img src="./icons/Logotipo_GIVY2@4x 2.png" alt="swap" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedItem;
