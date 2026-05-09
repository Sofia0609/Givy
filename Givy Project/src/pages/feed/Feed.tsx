import { useState } from "react";
import Description from "../../components/feed/description/description";
import VideoSection from "../../components/feed/video/Video";
import CircularButton from "../../components/feed/circularButton/CircularButton";
import Comments from "../../components/feed/comments/comments";
import ProfileButton from "../../components/feed/profileButton/ProfileButton";
import Tags from "../../components/feed/tags/Tags";
import ShareButton from "../../components/feed/shareButton/Sharebutton";
import SwapButton from "../../components/feed/swapButton/Swapbutton";
import SwapOverlay from "../../components/feed/swapOverlay/Swapoverlay";
import likeIcon from "../../assets/like_icon.svg";
import commentIcon from "../../assets/comment_icon.svg";
import usersData from "../../data/users.json";
import videosData from "../../data/videos.json";
import tagsData from "../../data/tags.json";
import commentsData from "../../data/comments.json";
import "./Feed.css";
import NavBar from "../../components/navBar/navBar";

const resolveTagNames = (tagIds: string[]): string[] =>
  tagIds.map((id) => tagsData.find((t) => t.id === id)?.name ?? id);

const getInitials = (username: string): string =>
  username.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export interface ReplyData {
  id: string;
  parentCommentId: string;
  userId: string;
  text: string;
  date: string;
}

export interface CommentData {
  id: string;
  videoId: string;
  userId: string;
  text: string;
  date: string;
  replies: ReplyData[];
  isOwn?: boolean;
}

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

const buildInitialComments = (): Record<string, CommentData[]> => {
  const map: Record<string, CommentData[]> = {};
  feedItems.forEach(({ video }) => {
    map[video.id] = commentsData
      .filter((c) => c.videoId === video.id)
      .map((c) => ({ ...c, isOwn: false }));
  });
  return map;
};

function Feed() {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>(
    Object.fromEntries(videosData.map((v) => [v.id, v.likes]))
  );
  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentData[]>>(
    buildInitialComments()
  );
  const [swapAnimMap, setSwapAnimMap] = useState<Record<string, boolean>>({});

  const toggleLike = (videoId: string) => {
    const liked = likedMap[videoId] ?? false;
    setLikedMap({ ...likedMap, [videoId]: !liked });
    setLikeCountMap({
      ...likeCountMap,
      [videoId]: (likeCountMap[videoId] ?? 0) + (liked ? -1 : 1),
    });
  };

  const toggleComments = (videoId: string) => {
    setShowCommentsMap({ ...showCommentsMap, [videoId]: !showCommentsMap[videoId] });
  };

  const handleSwap = (videoId: string) => {
    setSwapAnimMap((prev) => ({ ...prev, [videoId]: true }));
    setTimeout(() => {
      setSwapAnimMap((prev) => ({ ...prev, [videoId]: false }));
    }, 1200);
  };

  const addComment = (videoId: string, text: string) => {
    const newComment: CommentData = {
      // eslint-disable-next-line react-hooks/purity
      id: `own-${Date.now()}`,
      videoId,
      userId: "me",
      text,
      date: new Date().toISOString(),
      replies: [],
      isOwn: true,
    };
    setCommentsMap((prev) => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] ?? [])],
    }));
  };

  const deleteComment = (videoId: string, commentId: string) => {
    setCommentsMap((prev) => ({
      ...prev,
      [videoId]: (prev[videoId] ?? []).filter((c) => c.id !== commentId),
    }));
  };

  return (
    <div className="layout">
      <NavBar />
      <div className="feed">
        {feedItems.map(({ user, video }) => {
          const teachTagNames = resolveTagNames(user.wantsToTeach);
          const learnTagNames = resolveTagNames(user.wantsToLearn);
          const videoTagNames = resolveTagNames(video.tags);
          const videoComments = commentsMap[video.id] ?? [];

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
                    <button className="tab-btn active-tab">{teachTagNames[0] ?? "Enseña"}</button>
                    <button className="tab-btn">{learnTagNames[0] ?? "Aprende"}</button>
                  </div>
                </div>

                <VideoSection id={video.id} title={video.title} url={video.url} />

                <div className="video-user-bottom">
                  <h3>{user.at}</h3>
                  <p>{video.description}</p>
                </div>

                <SwapOverlay visible={swapAnimMap[video.id] ?? false} />

                {showCommentsMap[video.id] && (
                  <div className="comments-overlay">
                    <Comments
                      comments={videoComments}
                      onClose={() => toggleComments(video.id)}
                      onAddComment={(text) => addComment(video.id, text)}
                      onDeleteComment={(commentId) => deleteComment(video.id, commentId)}
                    />
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
                  count={videoComments.length}
                  onClick={() => toggleComments(video.id)}
                />
                <SwapButton onSwap={() => handleSwap(video.id)} />
                <ShareButton />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed;