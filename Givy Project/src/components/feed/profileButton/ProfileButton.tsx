import React from "react";
import "./ProfileButton.css";
import userIcon from "../../../assets/user_icon.svg";

interface Props {
  username?: string;
}

const ProfileButton: React.FC<Props> = ({ username }) => (
  <div className="profile-button-wrapper">
    <button className="profile-button" aria-label={`Perfil de ${username}`}>
      <img src={userIcon} alt="profile" />
    </button>
    <span className="profile-plus">+</span>
  </div>
);

export default ProfileButton;