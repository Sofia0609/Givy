import React from "react";
import "./circularButton.css";
import likeIcon from "../../../assets/like_icon.svg";

interface Props {
  liked: boolean;
  likeCount: number;
  onClick: () => void;
}

const CircularButton: React.FC<Props> = ({ liked, likeCount, onClick }) => (
  <div className="circular-button">
    <button className={liked ? "Liked" : ""} onClick={onClick}>
      <img src={likeIcon} alt="like" />
    </button>
    <span className="like_counter">{likeCount}</span>
  </div>
);

export default CircularButton;
