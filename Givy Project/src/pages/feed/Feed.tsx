import { useState } from "react";
import Description from "../../components/feed/description/description";
import VideoSection from "../../components/feed/video/Video";
import CircularButton from "../../components/feed/circularButton/CircularButton";
import Comments from "../../components/feed/comments/comments";
import ProfileButton from "../../components/feed/profileButton/ProfileButton";
import Tags from "../../components/feed/tags/Tags";
import likeIcon from "../../assets/like_icon.svg";
import commentIcon from "../../assets/comment_icon.svg";
import shareIcon from "../../assets/share_icon.svg";
import interactionsIcon from "../../assets/interactions_icon.svg";
import "./Feed.css";

// Datos de ejemplo (reemplaza con tu import de JSON)
const users = [
  {
    id: "1",
    username: "Emilio Álvarez",
    bio: "Hi! I've been a teacher in this area for more than 5 years. I'm very hardworking and proactive. Today's lesson was about derivatives. Do you need a lesson on this or another topic?",
    wantsToTeach: ["Bass teacher", "Music teacher", "Bass coach"],
    teaches: "Math teacher",
  },
];

const videos = [
  {
    id: "v1",
    title: "",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

function Feed() {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({});
  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    const liked = likedMap[id];
    setLikedMap({ ...likedMap, [id]: !liked });
    setLikeCountMap({
      ...likeCountMap,
      [id]: (likeCountMap[id] || 0) + (liked ? -1 : 1),
    });
  };

  const toggleComments = (id: string) => {
    setShowCommentsMap({ ...showCommentsMap, [id]: !showCommentsMap[id] });
  };

  return (
    <div className="feed">
      {users.map((user, index) => (
        <div key={user.id} className="feed-item">
          {/* Video ocupa todo el fondo */}
          <div className="feed-video-wrapper">
            <VideoSection
              id={videos[index]?.id ?? ""}
              title={videos[index]?.title ?? ""}
              url={videos[index]?.url ?? ""}
            />
          </div>

          {/* Sidebar derecho con botones circulares */}
          <div className="feed-sidebar">
            <ProfileButton username={user.username} />
            <CircularButton
              icon={likeIcon}
              count={likeCountMap[user.id] || 0}
              onClick={() => toggleLike(user.id)}
              active={likedMap[user.id]}
            />
            <CircularButton
              icon={commentIcon}
              onClick={() => toggleComments(user.id)}
            />
            <CircularButton
              icon={interactionsIcon}
              onClick={() => {}}
            />
            <CircularButton
              icon={shareIcon}
              onClick={() => {}}
            />
          </div>

          {/* Info inferior izquierda */}
          <div className="feed-bottom">
            <Description
              username={user.username}
              bio={user.bio}
              teaches={user.teaches}
            />
            <Tags items={user.wantsToTeach} />
          </div>

          {/* Sección de comentarios (expandible) */}
          {showCommentsMap[user.id] && (
            <div className="feed-comments-overlay">
              <Comments />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Feed;