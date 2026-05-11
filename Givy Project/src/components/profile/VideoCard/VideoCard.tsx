import { useNavigate } from 'react-router'
import './VideoCard.css'

interface VideoCardProps {
    videourl?: string
    videoId?: string
}

function VideoCard({ videourl, videoId }: VideoCardProps) {
    const navigate = useNavigate()

    function handleClick() {
        if (videoId) {
            navigate(`/Feed/${videoId}`)
        }
    }

    return (
        <div className="videoCard" onClick={handleClick}>
            <div className="videoCardThumbnail">
                {videourl
                    ? <video src={videourl} />
                    : <div className="videoCardPlaceholder" />
                }
                <div className="videoCardOverlay">
                    <span className="videoCardPlay">▶</span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard