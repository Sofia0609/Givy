import "./Description.css";
import swapIcon from "../../../assets/swap_icon.svg";

interface Props {
  username: string;
  bio: string;
  teaches?: string;
  lookingFor?: string;
}

function Description({ username, bio, teaches, lookingFor }: Props) {
  return (
    <section className="description">
      <h2 className="description-username">@{username}</h2>
      <p className="description-bio">{bio}</p>
      {teaches && (
        <div className="description-teaches-wrapper">
          <span className="description-teaches">{teaches}</span>
        </div>
      )}
      {lookingFor && (
        <div className="description-looking">
          <span>{lookingFor}</span>
          <img src={swapIcon} alt="swap" className="description-swap-icon" />
        </div>
      )}
    </section>
  );
}

export default Description;