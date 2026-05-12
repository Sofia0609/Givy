import { useNavigate } from 'react-router'
import './VideoCard.css'

interface VideoCardProps {
    videourl ?: string
    videoId?: string
    // views?: number
}

function VideoCard({ videourl, videoId }: VideoCardProps) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (videoId) {
            navigate(`/Feed/${videoId}`)
        }
    }

    return (
        <div className="videoCard" onClick={handleClick} style={{ cursor: videoId ? 'pointer' : 'default' }}>
            <div className="videoCardThumbnail">
                {videourl 
                    ? <video src={videourl } />
                    : <div className="videoCardPlaceholder" />
                }
                <div className="videoCardOverlay">
                    <span className="videoCardPlay">▶</span>
                    {/* {views !== undefined && (
                        <span className="videoCardViews">{views.toLocaleString()} views</span>
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default VideoCard