import './VideoCard.css'

interface VideoCardProps {
    videourl ?: string
    // views?: number
}

function VideoCard({ videourl }: VideoCardProps) {
    return (
        <div className="videoCard">
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