import React from "react";
import "./ProfileButton.css";

interface Props {
  initials?: string;
}

const ProfileButton: React.FC<Props> = ({ initials = "?" }) => (
  <div className="profile-button-wrapper">
    <div className="profile-avatar">
      <span>{initials}</span>
    </div>
    <div className="profile-plus">+</div>
  </div>
);

export default ProfileButton;