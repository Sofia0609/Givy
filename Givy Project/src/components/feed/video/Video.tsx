import "./Video.css";

interface Props {
  id: string;
  title: string;
  url: string;
}

function VideoSection({ id, title, url }: Props) {
  return (
    <div className="video-section">
      <video
        id={id}
        src={url}
        title={title}
        loop
        playsInline
        controls={false}
        autoPlay
        muted
      />
    </div>
  );
}

export default VideoSection;