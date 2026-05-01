import './ProfileName.css'

interface ProfileName {
    name: string
    username: string
}

function ProfileName({ name, username }: ProfileName) {
    return (
        <div className="profileNameWrapper">
            <div className="profileNameRow">
                <span className="profileNameText">{name}</span>
            </div>
            <span className="profileNameUsername">@{username}</span>
        </div>
    )
}

export default ProfileName