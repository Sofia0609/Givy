import { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router';
import type { User, Video, SwapRequest } from '../../types/index'
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
import usersData from '../../data/users.json';
import videosData from '../../data/videos.json';
import tagsData from '../../data/tags.json';
import commentsData from '../../data/comments.json';
import swapRequestsData from '../../data/swapRequests.json';
import './Feed.css';
import NavBar from '../../components/navBar/navBar';

// -- Helpers ----------------------------------------------
const resolveTagNames = (tagIds: string[]): string[] =>
  tagIds.map((id) => tagsData.find((t) => t.id === id)?.name ?? id);

const getInitials = (username: string): string =>
  username.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

// -- Tipos ------------------------------------------------
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

// -- Componente --------------------------------------------
function Feed() {
  const { videoId } = useParams<{ videoId?: string }>();

  const loggedUserData = JSON.parse(localStorage.getItem('loggeduser') || '{}')
  let loggedUser = (usersData as User[]).find(u => u.id === loggedUserData.id)

  if (!loggedUser) {
    const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
    loggedUser = storedUsers.find((u: any) => u.id === loggedUserData.id)
  }

  if (!loggedUser) {
    return <Navigate to='/login' />
  }

  const buildFeedItems = (): FeedItem[] => {
    const wantsToLearn = loggedUser.wantsToLearn;

    const stored = localStorage.getItem('videos')
    const allVideos: Video[] = stored ? JSON.parse(stored) : (videosData as Video[])

    let videosToShow = allVideos;

    // If we have a specific videoId, only show that video
    if (videoId) {
      videosToShow = allVideos.filter(video => video.id === videoId);
    } else {
      // Otherwise, show the normal feed filtering
      const relevant = allVideos.filter(
        (video) =>
          video.userId !== loggedUser.id &&
          video.teaches.some((tag) => wantsToLearn.includes(tag))
      );

      const others = allVideos.filter(
        (video) =>
          video.userId !== loggedUser.id &&
          !video.teaches.some((tag) => wantsToLearn.includes(tag))
      );

      videosToShow = [...relevant, ...others];
    }

    return videosToShow
      .map((video) => {

        let user = (usersData as User[]).find((u) => u.id === video.userId);

        if (!user) {
          const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
          user = storedUsers.find((u: any) => u.id === video.userId)
        }

        if (!user) return null;
        return { user, video };
      })
      .filter((item): item is FeedItem => item !== null);
  };

  const feedItems = buildFeedItems();

  // -- Estados ----------------------------------------------
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('likedMap');
    return saved ? JSON.parse(saved) : {};
  });

  const [likeCountMap, setLikeCountMap] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('likeCountMap');
    return saved ? JSON.parse(saved) : Object.fromEntries((videosData as Video[]).map((v) => [v.id, v.likes]));
  });

  const [showCommentsMap, setShowCommentsMap] = useState<Record<string, boolean>>({});

  const [commentsMap, setCommentsMap] = useState<Record<string, CommentData[]>>(() => {
    const saved = localStorage.getItem('comments');
    if (saved) return JSON.parse(saved);

    const map: Record<string, CommentData[]> = {};
    feedItems.forEach(({ video }) => {
      map[video.id] = (commentsData as any[])
        .filter((c) => c.videoId === video.id)
        .map((c) => ({ ...c, isOwn: false }));
    });
    return map;
  });

  const [swapAnimMap, setSwapAnimMap] = useState<Record<string, boolean>>({});

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // -- Efectos ----------------------------------------------
  useEffect(() => {
    // Only scroll if we have multiple videos (normal feed), not for single video view
    if (videoId && itemRefs.current[videoId] && feedItems.length > 1) {
      itemRefs.current[videoId]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [videoId, feedItems]);

  useEffect(() => {
    localStorage.setItem('likedMap', JSON.stringify(likedMap));
  }, [likedMap]);

  useEffect(() => {
    localStorage.setItem('likeCountMap', JSON.stringify(likeCountMap));
  }, [likeCountMap]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(commentsMap));
  }, [commentsMap]);

  // -- Handlers ---------------------------------------------
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
    // Find the video to get the user and tags
    const video = feedItems.find(item => item.video.id === videoId)?.video;
    if (!video) return;

    // Create new swap request
    const newSwapRequest: SwapRequest = {
      id: `sr-${Date.now()}`,
      fromUserId: loggedUser.id,
      toUserId: video.userId,
      status: 'pending',
      tagOffered: loggedUser.wantsToTeach?.[0] || '', // First teaching tag
      tagRequested: video.teaches[0] || '', // First tag the video teaches
      date: new Date().toISOString()
    };

    // Get existing swap requests and add the new one
    const stored = localStorage.getItem('swapRequests');
    const allSwaps: SwapRequest[] = stored ? JSON.parse(stored) : (swapRequestsData as SwapRequest[]);
    allSwaps.push(newSwapRequest);
    localStorage.setItem('swapRequests', JSON.stringify(allSwaps));

    // Show animation
    setSwapAnimMap((prev) => ({ ...prev, [videoId]: true }));
    setTimeout(() => {
      setSwapAnimMap((prev) => ({ ...prev, [videoId]: false }));
    }, 1200);
  };

  const addComment = (id: string, text: string) => {
    const newComment: CommentData = {
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
      id: `reply-${new Date().getTime()}`,
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

  return (
    <div className='layout'>
      <NavBar />
      <div className='feed'>
        {feedItems.map(({ user, video }) => {
          const teachTagNames = resolveTagNames(video.teaches);
          const learnTagNames = resolveTagNames(video.wantsToLearnInReturn);
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
                  teaches={teachTagNames}
                  lookingFor={learnTagNames}
                />
              </div>

              <div className='video-section'>
                <div className='video-user-top'>
                  <span className='video-username'>{user.username}</span>
                  <div className='swap-tabs'>
                    <button className='tab-btn active-tab'>{teachTagNames[0] ?? 'Ense�a'}</button>
                    <button className='tab-btn'>{learnTagNames[0] ?? 'Aprende'}</button>
                  </div>
                </div>

                <VideoSection id={video.id} title={video.title} url={video.url} />

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
                      onDeleteComment={(commentId) =>
                        deleteComment(video.id, commentId)
                      }
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
