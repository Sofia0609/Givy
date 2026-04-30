import React, { useState } from "react";

// Importar subcomponentes del feed
import Description from "../../components/feed/description/description";
import VideoSection from "../../components/feed/videoSection/VideoSection";
import CircularButton from "../../components/feed/circularButton/CircularButton";
import Comments from "../../components/feed/comments/comments";
import ProfileButton from "../../components/feed/profileButton/ProfileButton";
// Importar la data
import users from "../../data/users.json";
import videos from "../../data/videos.json";

const Feed: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments] = useState(false);
  
  return (
    <div className="feed">
      {users.map((user, index) => (
        <div key={user.id} className="feed-item">
          {/* Descripción del usuario */}
          <Description username={user.username} bio={user.bio} tags={[]} />

          {/* Video asociado al usuario */}
          <VideoSection video={videos[index].url} />

          {/* Barra lateral derecha con botones */}
          
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
         

          {/* Sección de comentarios */}
          {showComments && <Comments />}

          {/* Modal de swap */}
          
        </div>
      ))}
    </div>
  );
};

export default Feed;


