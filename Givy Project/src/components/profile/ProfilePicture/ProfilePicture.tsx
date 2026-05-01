import './ProfilePicture.css'

interface ProfilePicture {
    src?: string
    alt?: string
    size?: 'small' | 'medium' | 'large'
}

function ProfilePicture({ src, alt = 'Profile Picture', size = 'large' }: ProfilePicture) {
    return (
        <div className={`profilePictureWrapper profilePictureWrapper--${size}`}>
            <img 
                className="profilePicture" 
                src={src || "https://www.gravatar.com/avatar/?d=mp&s=150"} 
                alt={alt} 
            />
        </div>
    )
}

export default ProfilePicture