import { useNavigate } from 'react-router'
import './VideoCard.css'

interface VideoCardProps {
    videourl ?: string
    videoId?: string
}

function VideoCard({ videourl, videoId }: VideoCardProps) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (videoId) {
            navigate(`/Feed/${videoId}`)
        }
    }

    return (
        <div className="profileVideoCard" onClick={handleClick} style={{ cursor: videoId ? 'pointer' : 'default' }}>
            <div className="profileVideoCardThumbnail">
                {videourl 
                    ? <video src={videourl } />
                    : <div className="profileVideoCardPlaceholder" />
                }
                <div className="profileVideoCardOverlay">
                    <span className="profileVideoCardPlay">▶</span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard