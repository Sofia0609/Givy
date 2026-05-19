import "./SwapButton.css";
import swapIcon from "../../../assets/swap_icon.svg";

interface Props {
  onSwap: () => void;
}

function SwapButton({ onSwap }: Props) {
  return (
    <div className="swap-button">
      <button onClick={onSwap} aria-label="Swap">
        <img src={swapIcon} alt="swap" />
      </button>
    </div>
  );
}

export default SwapButton;