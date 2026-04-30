import "./Description.css";

interface Props {
  username: string;
  bio: string;
  teaches?: string;
  hashtags?: string[];
}

function Description({ username, bio, teaches, hashtags = [] }: Props) {
  return (
    <section className="description">
      <h2 className="description-username">@{username}</h2>
      {teaches && <span className="description-role">{teaches}</span>}
      <p className="description-bio">{bio}</p>
      {hashtags.length > 0 && (
        <div className="hashtags">
          {hashtags.map((tag, i) => (
            <span key={i} className="hashtag">#{tag}</span>
          ))}
        </div>
      )}
    </section>
  );
}

export default Description;