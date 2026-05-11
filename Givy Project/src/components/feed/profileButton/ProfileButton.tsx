import "./ProfileButton.css";

interface Props {
  initials?: string;
}

function ProfileButton({ initials = "?" }: Props) {
  return (
    <div className="profile-button-wrapper">
      <div className="profile-avatar">
        <span>{initials}</span>
      </div>
      <div className="profile-plus">+</div>
    </div>
  );
}

export default ProfileButton;