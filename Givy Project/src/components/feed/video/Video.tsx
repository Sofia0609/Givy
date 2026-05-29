import "./Video.css";

interface Props {
  id: string;
  title: string;
  url: string;
}

function VideoSection({ id, title, url }: Props) {
  return (
    <div className="video-wrapper">
      <video id={id} src={url} title={title} loop playsInline autoPlay muted />
    </div>
  );
}

export default VideoSection;