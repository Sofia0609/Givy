import { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';           
import { fetchFeed } from '../../store/videoSlice';               
import type { RootState, AppDispatch } from '../../store/store';  
import type { CommentData, ReplyData } from '../../types/index'
import Description from '../../components/feed/description/description';
import VideoSection from '../../components/feed/video/Video';
import CircularButton from '../../components/feed/circularButton/CircularButton';
import Comments from '../../components/feed/comments/comments';
import ProfileButton from '../../components/feed/profileButton/ProfileButton';
import ShareButton from '../../components/feed/shareButton/Sharebutton';
import SwapButton from '../../components/feed/swapButton/Swapbutton';
import SwapOverlay from '../../components/feed/swapOverlay/Swapoverlay';
import likeIcon from '../../assets/like_icon.svg';
import commentIcon from '../../assets/comment_icon.svg';
import tagsData from '../../data/tags.json';  // solo para mapear ID → nombre
import './Feed.css';
import NavBar from '../../components/navBar/navBar';

// -- Helpers  ----------------------------
const resolveTagName = (tagId: string): string =>
  tagsData.find((t) => t.id === tagId)?.name ?? tagId;

const getInitials = (username: string): string =>
  username.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

// -- Component --------------------------------------------
function Feed() {
  const { videoId } = useParams<{ videoId?: string }>();
  const dispatch = useDispatch<AppDispatch>();                    

  // user logged in redux
  const loggedUser = useSelector((state: RootState) => state.user.currentUser);

  // feedItems came from redux
  const { feedItems, loading, error } = useSelector((state: RootState) => state.videos);

  //  when loading Feed, dispatch fetchFeed
  useEffect(() => {
    if (loggedUser?.id) {
      dispatch(fetchFeed(loggedUser.id))
    }
  }, [loggedUser?.id, dispatch])

  // -- States ----------------------------
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({});
  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentData[]>>({});
  const [swapAnimMap, setSwapAnimMap] = useState<Record<string, boolean>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // inicialize likeCountMap  when feedItems came from Redux
  useEffect(() => {
    const initial: Record<string, number> = {};
    feedItems.forEach(({ video }) => {
      initial[video.id] = video.likes ?? 0;
    });
    // Defer setting state to avoid synchronous setState inside effect which can
    // cause cascading renders. Scheduling allows the current render to finish.
    const t = setTimeout(() => setLikeCountMap(initial), 0);
    return () => clearTimeout(t);
  }, [feedItems]);

  // -- Scroll  -----------------------------
  useEffect(() => {
    if (videoId && itemRefs.current[videoId] && feedItems.length > 1) {
      itemRefs.current[videoId]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [videoId, feedItems]);

  // -- Guards -----------------------------------------------
  if (!loggedUser) return <Navigate to='/Login' />;
  if (loading) return <div className="feed-loading">Cargando...</div>;
  if (error) return <div className="feed-error">{error}</div>;

  //  filtra por videoId si viene en la URL
  const itemsToShow = videoId
    ? feedItems.filter(item => item.video.id === videoId)
    : feedItems;

  // -- Handlers  ---------------------------
  const toggleLike = (id: string) => {
    const liked = likedMap[id] ?? false;
    setLikedMap({ ...likedMap, [id]: !liked });
    setLikeCountMap({
      ...likeCountMap,
      [id]: (likeCountMap[id] ?? 0) + (liked ? -1 : 1),
    });
  };

  const toggleComments = (id: string) => {
    setShowCommentsMap({ ...showCommentsMap, [id]: !showCommentsMap[id] });
  };

  const handleSwap = (videoId: string) => {
    const video = feedItems.find(item => item.video.id === videoId)?.video;
    if (!video) return;

    
    setSwapAnimMap((prev) => ({ ...prev, [videoId]: true }));
    setTimeout(() => {
      setSwapAnimMap((prev) => ({ ...prev, [videoId]: false }));
    }, 1200);
  };

  const addComment = (id: string, text: string) => {
    const newComment: CommentData = {
      // eslint-disable-next-line react-hooks/purity
      id: `own-${Date.now()}`,
      videoId: id,
      userId: loggedUser.id,
      text,
      date: new Date().toISOString(),
      replies: [],
      isOwn: true,
    };
    setCommentsMap((prev) => ({
      ...prev,
      [id]: [newComment, ...(prev[id] ?? [])],
    }));
  };

  const deleteComment = (id: string, commentId: string) => {
    setCommentsMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? []).filter((c) => c.id !== commentId),
    }));
  };

  const addReply = (videoId: string, commentId: string, text: string) => {
    const newReply: ReplyData = {
      // eslint-disable-next-line react-hooks/purity
      id: `reply-${Date.now()}`,
      parentCommentId: commentId,
      userId: loggedUser.id,
      text,
      date: new Date().toISOString(),
    };
    setCommentsMap((prev) => ({
      ...prev,
      [videoId]: (prev[videoId] ?? []).map((c) =>
        c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : c
      ),
    }));
  };

  const deleteReply = (videoId: string, commentId: string, replyId: string) => {
    setCommentsMap((prev) => ({
      ...prev,
      [videoId]: (prev[videoId] ?? []).map((c) =>
        c.id === commentId
          ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
          : c
      ),
    }));
  };

  // -- Render  -----------------------------
  return (
    <div className='layout'>
      <NavBar />
      <div className='feed'>
        {itemsToShow.map(({ user, video }) => {

          //  teaches and wantsToLearn 
          const teachTagName = resolveTagName(Array.isArray(video.teaches) ? video.teaches[0] : video.teaches);
          const learnTagName = resolveTagName(Array.isArray(video.wantsToLearn) ? video.wantsToLearn[0] : video.wantsToLearn);
          const videoComments = commentsMap[video.id] ?? [];

          return (
            <div
              key={video.id}
              className='feed-item'
              ref={(el) => { itemRefs.current[video.id] = el; }}
            >
              <div className='user-panel'>
                <Description
                  username={user.username}
                  bio={video.description}
                  teaches={[teachTagName]}
                  lookingFor={[learnTagName]}
                />
              </div>

              <div className='video-section'>
                <div className='video-user-top'>
                  <span className='video-username'>{user.username}</span>
                  <div className='swap-tabs'>
                    <button className='tab-btn active-tab'>{teachTagName}</button>
                    <button className='tab-btn'>{learnTagName}</button>
                  </div>
                </div>

                <VideoSection id={video.id} title={video.title ?? ''} url={video.url} />

                <div className='video-user-bottom'>
                  <h3>{user.at}</h3>
                  <p>{video.description}</p>
                </div>

                <SwapOverlay visible={swapAnimMap[video.id] ?? false} />

                {showCommentsMap[video.id] && (
                  <div className='comments-overlay'>
                    <Comments
                      comments={videoComments}
                      onClose={() => toggleComments(video.id)}
                      onAddComment={(text) => addComment(video.id, text)}
                      onDeleteComment={(commentId) => deleteComment(video.id, commentId)}
                      onAddReply={(commentId, text) => addReply(video.id, commentId, text)}
                      onDeleteReply={(commentId, replyId) => deleteReply(video.id, commentId, replyId)}
                      loggedUserId={loggedUser.id}
                    />
                  </div>
                )}
              </div>

              <div className='sidebar-right'>
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