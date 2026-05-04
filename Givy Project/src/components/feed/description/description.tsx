import "./Description.css";
import swapIcon from "../../../assets/swap_icon.svg";

interface Props {
  username: string;
  bio: string;
  teaches?: string[];
  lookingFor?: string[];
}

function Description({ username, bio, teaches = [], lookingFor = [] }: Props) {
  return (
    <section className="description">
      <h2 className="description-username">@{username}</h2>
      <p className="description-bio">{bio}</p>

      {teaches.length > 0 && (
        <div className="description-teaches-wrapper">
          <span className="description-teaches">{teaches.join(", ")}</span>
        </div>
      )}

      {lookingFor.length > 0 && (
        <div className="description-looking">
          <span>Looking for...</span>
          <img src={swapIcon} alt="swap" className="description-swap-icon" />
          <div className="description-looking-tags">
            {lookingFor.map((tag, i) => (
              <span key={i} className="description-looking-tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Description;