import React from "react";
import "./swap.css";
import swapIcon from "../../../assets/swap_icon.svg";

interface Props {
  show: boolean;
  onClose: () => void;
}

const SwapModal: React.FC<Props> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="swap-modal animation">
      <div className="swap-modal-content">
        <button className="swap-modal-close" onClick={onClose}>
          ✖
        </button>
        <img src={swapIcon} alt="swap" />
      </div>
    </div>
  );
};

export default SwapModal;
