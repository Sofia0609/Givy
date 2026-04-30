import React from "react";
import "./sidebarRight.css";

// Importar íconos desde assets
import profileIcon from "../../../assets/avatar.png";
import commentIcon from "../../../assets/comment_icon.svg";
import shareIcon from "../../../assets/share_icon.svg";
import swapIcon from "../../../assets/swap_icon.svg";

interface Props {
  onToggleComments: () => void;
  onToggleModal: () => void;
  children?: React.ReactNode; // Aquí se inyecta el botón de like
}

const SidebarRight: React.FC<Props> = ({ onToggleComments, onToggleModal, children }) => (
  <aside className="sidebar-right">
    {/* Botón de perfil */}
    <button className="sidebar-btn">
      <img src={profileIcon} alt="profile" />
    </button>

    {/* Botón de like (se pasa como children para modularizar) */}
    {children}

    {/* Botón de comentarios */}
    <button className="sidebar-btn" onClick={onToggleComments}>
      <img src={commentIcon} alt="comments" />
    </button>

    {/* Botón de compartir */}
    <button className="sidebar-btn">
      <img src={shareIcon} alt="share" />
    </button>

    {/* Botón de swap */}
    <button className="sidebar-btn" onClick={onToggleModal}>
      <img src={swapIcon} alt="swap" />
    </button>
  </aside>
);

export default SidebarRight;

