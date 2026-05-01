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
import usersData from "../../data/users.json";
import videosData from "../../data/videos.json";
import tagsData from "../../data/tags.json";
import "./Feed.css";
import NavBar from "../../components/navBar/navBar";

const resolveTagNames = (tagIds: string[]): string[] =>
  tagIds
    .map((id) => tagsData.find((t) => t.id === id)?.name ?? id)
    .filter(Boolean);

const getInitials = (username: string): string =>
  username
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

interface FeedItem {
  user: (typeof usersData)[0];
  video: (typeof videosData)[0];
}


const feedItems: FeedItem[] = videosData
  .map((video) => {
    const user = usersData.find((u) => u.id === video.userId);
    if (!user) return null;
    return { user, video };
  })
  .filter((item): item is FeedItem => item !== null);


function Feed() {

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>(
    Object.fromEntries(videosData.map((v) => [v.id, v.likes]))
  );
  const [showCommentsMap, setShowCommentsMap] = useState<
    Record<string, boolean>
  >({});

  const toggleLike = (videoId: string) => {
    const liked = likedMap[videoId] ?? false;
    setLikedMap({ ...likedMap, [videoId]: !liked });
    setLikeCountMap({
      ...likeCountMap,
      [videoId]: (likeCountMap[videoId] ?? 0) + (liked ? -1 : 1),
    });
  };

  const toggleComments = (videoId: string) => {
    setShowCommentsMap({
      ...showCommentsMap,
      [videoId]: !showCommentsMap[videoId],
    });
  };

  return (
    <div className="layout">

      <NavBar />

      <div className="feed">
        {feedItems.map(({ user, video }) => {

          const teachTagNames = resolveTagNames(user.wantsToTeach);
          const learnTagNames = resolveTagNames(user.wantsToLearn);
          const videoTagNames = resolveTagNames(video.tags);

          const swapTabs = [
            teachTagNames[0] ?? "Enseña",
            learnTagNames[0] ?? "Aprende",
          ];

          return (
            <div key={video.id} className="feed-item">

              <div className="user-panel">
                <Description
                  username={user.username}
                  bio={user.bio}
                  teaches={teachTagNames}
                  lookingFor={learnTagNames}
                />
                <Tags items={videoTagNames} />
              </div>

              <div className="video-section">

                <div className="video-user-top">
                  <span className="video-username">{user.username}</span>
                  <div className="swap-tabs">
                    {swapTabs.map((tab, i) => (
                      <button
                        key={i}
                        className={`tab-btn ${i === 0 ? "active-tab" : ""}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <VideoSection
                  id={video.id}
                  title={video.title}
                  url={video.url}
                />

  
                <div className="video-user-bottom">
                  <h3>{user.at}</h3>
                  <p>{video.description}</p>
                </div>

                {showCommentsMap[video.id] && (
                  <div className="comments-overlay">
                    <Comments onClose={() => toggleComments(video.id)} />
                  </div>
                )}
              </div>

              <div className="sidebar-right">
                <ProfileButton initials={getInitials(user.username)} />

                <CircularButton
                  icon={likeIcon}
                  count={likeCountMap[video.id] ?? video.likes}
                  onClick={() => toggleLike(video.id)}
                  active={likedMap[video.id] ?? false}
                />

                <CircularButton
                  icon={commentIcon}
                  onClick={() => toggleComments(video.id)}
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
          );
        })}
      </div>

      <nav className="bottom-nav">
        <a href="#"><img src="/assets/home_icon.svg" alt="Feed" /></a>
        <a href="#"><img src="/assets/search_icon.svg" alt="Buscar" /></a>
        <a href="#"><img src="/assets/create_icon.svg" alt="Crear" /></a>
        <a href="#"><img src="/assets/notification_icon.svg" alt="Notificaciones" /></a>
        <a href="#"><img src="/assets/user_icon.svg" alt="Perfil" /></a>
      </nav>
    </div>
  );
}

export default Feed;