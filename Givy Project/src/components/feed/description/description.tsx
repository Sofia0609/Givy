import React from "react";
import "./description.css";

interface Props {
  username: string;
  bio: string;
  tags: string[];
}

const Description: React.FC<Props> = ({ username, bio, tags }) => (
  <section className="description">
    <div className="user-info">
      <h2>@{username}</h2>
      <p>{bio}</p>
    </div>
    <div className="tags">
      {tags.map((tag, i) => (
        <button key={i} className="tag-btn">{tag}</button>
      ))}
    </div>
  </section>
);

export default Description;
