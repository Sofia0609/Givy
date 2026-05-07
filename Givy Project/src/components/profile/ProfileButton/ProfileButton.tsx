import './ProfileButton.css'

interface ProfileButton {
    label: string
    onClick?: () => void
}

function ProfileButton({ label, onClick }: ProfileButton) {
    return (
        <button className="profileButton" onClick={onClick}>
            {label}
        </button>
    )
}

export default ProfileButton