import "./Description.css";
import swapIlustration from "../../../assets/swap_ilustration.svg";

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
          <span className="description-teaches">
            {teaches.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}
          </span>
        </div>
      )}

      {lookingFor.length > 0 && (
        <div className="description-looking">
          <span className="description-looking-label">Looking for...</span>
          <img src={swapIlustration} alt="swap" className="description-swap-icon" />
          <div className="description-looking-tags">
            {lookingFor.map((tag, i) => (
              <span key={i} className="description-looking-tag">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Description;