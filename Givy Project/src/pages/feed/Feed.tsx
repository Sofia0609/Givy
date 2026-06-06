import { useState, useEffect, useRef } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed } from '../../store/videoSlice';
import type { RootState, AppDispatch } from '../../store/store';
import type { CommentData } from '../../types/index'
import Description from '../../components/feed/description/description';
import VideoSection from '../../components/feed/video/Video';
import CircularButton from '../../components/feed/circularButton/CircularButton';
import Comments from '../../components/feed/comments/comments';
import ProfileButton from '../../components/feed/profileButton/ProfileButton';
import ShareButton from '../../components/feed/shareButton/ShareButton';
import SwapButton from '../../components/feed/swapButton/Swapbutton';
import SwapOverlay from '../../components/feed/swapOverlay/Swapoverlay';
import likeIcon from '../../assets/like_icon.svg';
import commentIcon from '../../assets/comment_icon.svg';
import tagsData from '../../data/tags.json';
import { updateLike } from '../../services/videoService';
import { getCommentsByVideoId, addComment as addCommentDB, deleteComment as deleteCommentDB, addReply as addReplyDB, deleteReply as deleteReplyDB } from '../../services/commentService';
import { createSwapRequest } from '../../services/swapService';
import './Feed.css';
import NavBar from '../../components/navBar/navBar';
import { supabase } from '../../lib/supabase';

// -- Helpers ----------------------------------------------
const resolveTagName = (tagId: string | string[]): string => {
  if (Array.isArray(tagId)) {
    return tagId
      .map((id) => tagsData.find((t) => t.id === id)?.name ?? id)
      .join(', ');
  }
  return tagsData.find((t) => t.id === tagId)?.name ?? tagId;
};

const getInitials = (username: string): string =>
  username.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

// -- Component --------------------------------------------
function Feed() {
  const { videoId } = useParams<{ videoId?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate() 

  // Solo Redux, sin localStorage
  const loggedUser = useSelector((state: RootState) => state.user.currentUser)

  const { feedItems, loading, error } = useSelector((state: RootState) => state.videos);

  useEffect(() => {
    if (loggedUser?.id) {
      dispatch(fetchFeed(loggedUser.id))
    }
  }, [loggedUser?.id, dispatch])

  // -- States ----------------------------------------------
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>({});
  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentData[]>>({});
  const [swapAnimMap, setSwapAnimMap] = useState<Record<string, boolean>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

 useEffect(() => {
  const initial: Record<string, number> = {};
  feedItems.forEach(({ video }) => {
    initial[video.id] = video.likes ?? 0;
  });
  setLikeCountMap(initial);
}, [feedItems]);

  useEffect(() => {
    const loadComments = async () => {
      const map: Record<string, CommentData[]> = {}
      for (const { video } of feedItems) {
        const comments = await getCommentsByVideoId(video.id)
        map[video.id] = comments
      }
      setCommentsMap(map)
    }
    if (feedItems.length > 0) loadComments()
  }, [feedItems])

  useEffect(() => {
    if (videoId && itemRefs.current[videoId] && feedItems.length > 1) {
      itemRefs.current[videoId]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [videoId, feedItems]);

  if (!loggedUser) return <Navigate to='/Login' />;
  if (loading) return <div className="feed-loading">Cargando...</div>;
  if (error) return <div className="feed-error">{error}</div>;

  const itemsToShow = videoId
    ? feedItems.filter(item => item.video.id === videoId)
    : feedItems;

  // -- Handlers ---------------------------------------------
  const toggleLike = async (id: string) => {
    const liked = likedMap[id] ?? false;
    const currentCount = likeCountMap[id] ?? 0;
    const newCount = liked ? currentCount - 1 : currentCount + 1;

    setLikedMap({ ...likedMap, [id]: !liked });
    setLikeCountMap({ ...likeCountMap, [id]: newCount });

    try {
      await updateLike(id, newCount)
    } catch (error) {
      setLikedMap({ ...likedMap, [id]: liked });
      setLikeCountMap({ ...likeCountMap, [id]: currentCount });
      console.error('Error updating like:', error)
    }
  };

  const toggleComments = (id: string) => {
    setShowCommentsMap({ ...showCommentsMap, [id]: !showCommentsMap[id] });
  };

  const handleSwap = async (videoId: string) => {
    const video = feedItems.find(item => item.video.id === videoId)?.video;
    if (!video) return;

    try {
      // Verificar si ya existe un swap pendiente entre estos usuarios
      const { data: existing } = await supabase
        .from('swapRequests')
        .select('id')
        .eq('fromUserId', loggedUser.id)
        .eq('toUserId', video.userId)
        .eq('status', 'pending')

      if (existing && existing.length > 0) {
        alert('You already sent a swap request to this user!')
        return
      }

      await createSwapRequest(
        loggedUser.id,
        video.userId,
        loggedUser.wantsToTeach?.[0] ?? '',
        video.teaches[0] ?? ''
      )
      setSwapAnimMap((prev) => ({ ...prev, [videoId]: true }));
      setTimeout(() => {
        setSwapAnimMap((prev) => ({ ...prev, [videoId]: false }));
      }, 1200);
    } catch (error) {
      console.error('Error creating swap request:', error)
    }
  };

  const addComment = async (id: string, text: string) => {
    try {
      const newComment = await addCommentDB(id, loggedUser.id, text)
      setCommentsMap((prev) => ({
        ...prev,
        [id]: [newComment, ...(prev[id] ?? [])],
      }))
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const deleteComment = async (id: string, commentId: string) => {
    try {
      await deleteCommentDB(commentId)
      setCommentsMap((prev) => ({
        ...prev,
        [id]: (prev[id] ?? []).filter((c) => c.id !== commentId),
      }))
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  const addReply = async (videoId: string, commentId: string, text: string) => {
    try {
      const newReply = await addReplyDB(commentId, loggedUser.id, text)
      setCommentsMap((prev) => ({
        ...prev,
        [videoId]: (prev[videoId] ?? []).map((c) =>
          c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : c
        ),
      }))
    } catch (error) {
      console.error('Error adding reply:', error)
    }
  }

  const deleteReply = async (videoId: string, commentId: string, replyId: string) => {
    try {
      await deleteReplyDB(replyId)
      setCommentsMap((prev) => ({
        ...prev,
        [videoId]: (prev[videoId] ?? []).map((c) =>
          c.id === commentId
            ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
            : c
        ),
      }))
    } catch (error) {
      console.error('Error deleting reply:', error)
    }
  }

  // -- Render -----------------------------------------------
  return (
    <div className='layout'>
      <NavBar />
      <div className='feed'>
        {itemsToShow.map(({ user, video }) => {
          const teachTagName = resolveTagName(video.teaches);
          const learnTagName = resolveTagName(video.wantsToLearn);
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
                <div onClick={() => navigate(`/Profile/${user.id}`)} style={{ cursor: 'pointer' }}>
                  <ProfileButton initials={getInitials(user.username)} />
                </div>

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