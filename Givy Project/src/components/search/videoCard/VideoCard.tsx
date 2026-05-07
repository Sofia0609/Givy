import './VideoCard.css'

interface VideoCard {
    thumbnail: string
    title: string
    userPhoto: string
    username: string
}

function VideoCard({ thumbnail, title, userPhoto, username }: VideoCard) {
    return (
        <div className="videoCard">
            <img className="videoThumb" src={thumbnail} alt={title} />
            <p className="videoTitle">{title}</p>
            <div className="videoUser">
                <img className="userPhoto" src={userPhoto} alt={username} />
                <span className="userName">{username}</span>
            </div>
        </div>
    )
}

export default VideoCard