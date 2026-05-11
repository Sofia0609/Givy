import "./ShareButton.css";
import shareIcon from "../../../assets/share_icon.svg";

interface Props {
  videoId: string;
}

function ShareButton({ videoId }: Props) {
  const handleShare = () => {
   
    const videoUrl = `${window.location.origin}/Feed/${videoId}`;
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert("¡Link del video copiado!");
    });
  };

  return (
    <div className="share-button">
      <button onClick={handleShare} aria-label="Compartir">
        <img src={shareIcon} alt="share" />
      </button>
    </div>
  );
}

export default ShareButton;