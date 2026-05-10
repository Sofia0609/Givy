import "./ShareButton.css";
import shareIcon from "../../../assets/share_icon.svg";

function ShareButton() {
  const handleShare = () => {
    const currentUrl = new URL(window.location.href);
    navigator.clipboard.writeText(currentUrl.toString()).then(() => {
      alert("¡URL copiada al portapapeles!");
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