import './ProfilePicture.css'
interface ProfilePicture {
    src: string
    alt?: string
    size?: 'smallder' | 'medium' | 'large'
}
function ProfilePicture({ src, alt='Profile Picture', size='large' }: ProfilePicture) {
    return (
        <div className={`profilePictureWrapper  profilePictureWrapper--${size}`}>
            <img className="profilePicture" src={src} alt={alt} />
        </div>
    )
}
export default ProfilePicture