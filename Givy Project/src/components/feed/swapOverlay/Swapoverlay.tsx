import "./SwapOverlay.css";
import swapAnimation from "../../../assets/swap_animation.png";

interface Props {
  visible: boolean;
}

function SwapOverlay({ visible }: Props) {
  if (!visible) return null;
  return (
    <div className="swap-overlay">
      <img src={swapAnimation} alt="swap" className="swap-overlay-img" />
    </div>
  );
}

export default SwapOverlay;