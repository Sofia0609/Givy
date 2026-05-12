import { useState, useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router";
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

// ── Helpers ──────────────────────────────────────────────
const resolveTagNames = (tagIds: string[]): string[] =>
  tagIds.map((id) => tagsData.find((t) => t.id === id)?.name ?? id);

const getInitials = (username: string): string =>
  username.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

// ── Tipos ────────────────────────────────────────────────
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

// ── Feed items por usuario logueado ──────────────────────
const buildFeedItems = (loggedUserId: string, wantsToLearn: string[]): FeedItem[] => {
  const stored = localStorage.getItem("videos");
  const allVideos = stored ? JSON.parse(stored) : videosData;

  const relevant = allVideos.filter(
    (video: typeof videosData[0]) =>
      video.userId !== loggedUserId &&
      video.teaches.some((tag: string) => wantsToLearn.includes(tag))
  );

  const others = allVideos.filter(
    (video: typeof videosData[0]) =>
      video.userId !== loggedUserId &&
      !video.teaches.some((tag: string) => wantsToLearn.includes(tag))
  );

  return [...relevant, ...others]
    .map((video: typeof videosData[0]) => {
      const user = usersData.find((u) => u.id === video.userId);
      if (!user) return null;
      return { user, video };
    })
    .filter((item): item is FeedItem => item !== null);
};

// ── Comentarios iniciales desde JSON + localStorage ───────
const buildInitialComments = (items: FeedItem[]): Record<string, CommentData[]> => {
  const saved = localStorage.getItem("comments");
  if (saved) return JSON.parse(saved);

  const map: Record<string, CommentData[]> = {};
  items.forEach(({ video }) => {
    map[video.id] = commentsData
      .filter((c) => c.videoId === video.id)
      .map((c) => ({ ...c, isOwn: false }));
  });
  return map;
};

// ── Likes iniciales desde localStorage ───────────────────
const buildInitialLikes = (): Record<string, boolean> => {
  const saved = localStorage.getItem("likedMap");
  return saved ? JSON.parse(saved) : {};
};

const buildInitialLikeCounts = (): Record<string, number> => {
  const saved = localStorage.getItem("likeCountMap");
  return saved
    ? JSON.parse(saved)
    : Object.fromEntries(videosData.map((v) => [v.id, v.likes]));
};

// ── Componente ────────────────────────────────────────────
function Feed() {
  // ── TODOS LOS HOOKS PRIMERO — antes de cualquier return ──

  const { videoId } = useParams<{ videoId?: string }>();

  // Usuario logueado desde localStorage
  const loggedUserData = JSON.parse(localStorage.getItem("loggeduser") || "{}");
  const loggedUser = usersData.find((u) => u.id === loggedUserData.id);

  // feedItems depende de loggedUser pero se calcula siempre
  const feedItems = loggedUser
    ? buildFeedItems(loggedUser.id, loggedUser.wantsToLearn)
    : [];

  // Likes — se guardan en localStorage
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(buildInitialLikes);
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>(buildInitialLikeCounts);

  // Comentarios — se guardan en localStorage
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentData[]>>(
    () => buildInitialComments(feedItems)
  );

  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});
  const [swapAnimMap, setSwapAnimMap] = useState<Record<string, boolean>>({});

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll al video del link
  useEffect(() => {
    if (videoId && itemRefs.current[videoId]) {
      itemRefs.current[videoId]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [videoId]);

  // Guardar likes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("likedMap", JSON.stringify(likedMap));
  }, [likedMap]);

  useEffect(() => {
    localStorage.setItem("likeCountMap", JSON.stringify(likeCountMap));
  }, [likeCountMap]);

  // Guardar comentarios en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsMap));
  }, [commentsMap]);

  // ── Return condicional DESPUÉS de todos los hooks ────────
  if (!loggedUser) {
    return <Navigate to="/login" />;
  }

  // ── Handlers ─────────────────────────────────────────────
  const toggleLike = (id: string) => {
    const liked = likedMap[id] ?? false;
    setLikedMap((prev) => ({ ...prev, [id]: !liked }));
    setLikeCountMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + (liked ? -1 : 1),
    }));
  };

  const toggleComments = (id: string) => {
    setShowCommentsMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSwap = (id: string) => {
    setSwapAnimMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSwapAnimMap((prev) => ({ ...prev, [id]: false }));
    }, 1200);
  };

  const addComment = (videoId: string, text: string) => {
    const newComment: CommentData = {
  id: `own-${new Date().getTime()}`,
      videoId,
      userId: loggedUser.id,
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

  // Agregar respuesta a un comentario (doble click)
  const addReply = (videoId: string, commentId: string, text: string) => {
    const newReply: ReplyData = {
     id: `reply-${new Date().getTime()}`,
      parentCommentId: commentId,
      userId: loggedUser.id,
      text,
      date: new Date().toISOString(),
    };
    setCommentsMap((prev) => ({
      ...prev,
      [videoId]: (prev[videoId] ?? []).map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, newReply] }
          : c
      ),
    }));
  };

  return (
    <div className="layout">
      <NavBar />

      <div className="feed">
        {feedItems.map(({ user, video }) => {
          const teachTagNames = resolveTagNames(video.teaches);
          const learnTagNames = resolveTagNames(video.wantsToLearnInReturn);
          const videoTagNames = resolveTagNames(video.tags);
          const videoComments = commentsMap[video.id] ?? [];

          return (
            <div
              key={video.id}
              className="feed-item"
              ref={(el) => { itemRefs.current[video.id] = el; }}
            >
              <div className="user-panel">
                <Description
                  username={user.username}
                  bio={video.description}
                  teaches={teachTagNames}
                  lookingFor={learnTagNames}
                />
                <Tags items={videoTagNames} />
              </div>

              <div className="video-section">
                <div className="video-user-top">
                  <span className="video-username">{user.username}</span>
                  <div className="swap-tabs">
                    <button className="tab-btn active-tab">
                      {teachTagNames[0] ?? "Enseña"}
                    </button>
                    <button className="tab-btn">
                      {learnTagNames[0] ?? "Aprende"}
                    </button>
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
                      onAddReply={(commentId, text) => addReply(video.id, commentId, text)}
                      loggedUserId={loggedUser.id}
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

                <ShareButton videoId={video.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed;