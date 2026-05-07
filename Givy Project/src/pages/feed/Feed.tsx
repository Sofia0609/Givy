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
import swapIcon from "../../assets/swap_icon.svg";
import "./Feed.css";
import NavBar from "../../components/navBar/navBar";

interface UserData {
  id: string;
  username: string;
  initials: string;
  teaches: string;
  bio: string;
  lookingFor: string;
  wantsToTeach: string[];
  swapTabs: string[];
}

interface VideoData {
  id: string;
  title: string;
  url: string;
}

// Reemplaza con tu import desde JSON
const users: UserData[] = [
  {
    id: "1",
    username: "Emilio Álvarez",
    initials: "EA",
    teaches: "Math teacher",
    bio: "Hi! I've been a teacher in this area for more than 5 years. I'm very hardworking and proactive. Today's lesson was about derivatives. Do you need a lesson on this or another topic?",
    lookingFor: "Looking for...",
    wantsToTeach: ["Bass teacher", "Music teacher", "Bass coach"],
    swapTabs: ["Art", "Music"],
  },
  {
    id: "2",
    username: "Sara López",
    initials: "SL",
    teaches: "Music teacher",
    bio: "Profesora de música con 3 años de experiencia. Enseño guitarra, piano y teoría musical.",
    lookingFor: "Looking for...",
    wantsToTeach: ["Math tutor", "English teacher"],
    swapTabs: ["Math", "English"],
  },
];

const videos: VideoData[] = [
  { id: "v1", title: "Derivadas", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: "v2", title: "Guitarra",  url: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

function Feed() {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({});
  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    const liked = likedMap[id];
    setLikedMap({ ...likedMap, [id]: !liked });
    setLikeCountMap({ ...likeCountMap, [id]: (likeCountMap[id] || 0) + (liked ? -1 : 1) });
  };

  const toggleComments = (id: string) => {
    setShowCommentsMap({ ...showCommentsMap, [id]: !showCommentsMap[id] });
  };

  return (
    <div className="layout">

      <NavBar/>

      {/* ── Scroll feed ── */}
      <div className="feed">
        {users.map((user, index) => (
          <div key={user.id} className="feed-item">

            {/* Panel usuario — solo desktop */}
            <div className="user-panel">
              <Description
                username={user.username}
                bio={user.bio}
                teaches={user.teaches}
                lookingFor={user.lookingFor}
              />
              <Tags items={user.wantsToTeach} />
            </div>

            {/* Video + overlays */}
            <div className="video-section">

              {/* Overlay top mobile */}
              <div className="video-user-top">
                <span className="video-username">{user.username}</span>
                <div className="swap-tabs">
                  {user.swapTabs.map((tab, i) => (
                    <button key={i} className={`tab-btn ${i === 1 ? "active-tab" : ""}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <VideoSection
                id={videos[index]?.id ?? "v1"}
                title={videos[index]?.title ?? ""}
                url={videos[index]?.url ?? ""}
              />

              {/* Overlay bottom mobile */}
              <div className="video-user-bottom">
                <h3>@{user.username}</h3>
                <p>{user.bio}</p>
              </div>

              {/* Comentarios sobre el video */}
              {showCommentsMap[user.id] && (
                <div className="comments-overlay">
                  <Comments onClose={() => toggleComments(user.id)} />
                </div>
              )}
            </div>

            {/* ── Sidebar derecho: profile → like → comments → swap → share ── */}
            <div className="sidebar-right">
              <ProfileButton initials={user.initials} />

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
                icon={swapIcon}
                onClick={() => {}}
              />

              <CircularButton
                icon={shareIcon}
                onClick={() => {}}
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;