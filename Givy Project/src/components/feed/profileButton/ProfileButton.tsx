import React from "react";
import "./profileButton.css";
import userIcon from "../../../assets/user_icon.svg";

const ProfileButton: React.FC = () => (
  <button className="profile_button">
    <img src={userIcon} alt="profile" />
  </button>
);

export default ProfileButton;
