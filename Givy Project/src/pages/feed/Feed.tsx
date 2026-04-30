import React, { useState } from "react";

// Importar subcomponentes del feed
import Description from "../../components/feed/description/description";
import VideoSection from "../../components/feed/videoSection/VideoSection";
import SidebarRight from "../../components/feed/sidebarRight/SidebarRight";
import CircularButton from "../../components/feed/circularButton/CircularButton";
import Comments from "../../components/feed/comments/comments";
import ProfileButton from "../../components/feed/profileButton/ProfileButton";
import SwapModal from "../../components/feed/swap/SwapModal";

// Importar la data
import users from "../../data/users.json";
import videos from "../../data/videos.json";

const Feed: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="feed">
      {users.map((user, index) => (
        <div key={user.id} className="feed-item">
          {/* Descripción del usuario */}
          <Description username={user.username} bio={user.bio} tags={[]} />

          {/* Video asociado al usuario */}
          <VideoSection video={videos[index].url} />

          {/* Barra lateral derecha con botones */}
          <SidebarRight
            onToggleComments={() => setShowComments(!showComments)}
            onToggleModal={() => setShowModal(true)}
          >
            {/* Botón de perfil */}
            <ProfileButton />

            {/* Botón de like */}
            <CircularButton
              liked={liked}
              likeCount={likeCount}
              onClick={() => {
                if (liked) setLikeCount(likeCount - 1);
                else setLikeCount(likeCount + 1);
                setLiked(!liked);
              }}
            />
          </SidebarRight>

          {/* Sección de comentarios */}
          {showComments && <Comments />}

          {/* Modal de swap */}
          <SwapModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
      ))}
    </div>
  );
};

export default Feed;


