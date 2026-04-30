import React from "react";
import "./video.css";

interface Props {
  video: string;
}

const VideoSection: React.FC<Props> = ({ video }) => (
  <main className="video-section">
    <video src={video} muted loop autoPlay />
  </main>
);

export default VideoSection;
