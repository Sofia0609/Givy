import './VideoCard.css'

interface VideoCardProps {
    thumbnail?: string
    views?: number
}

function VideoCard({ thumbnail, views }: VideoCardProps) {
    return (
        <div className="videoCard">
            <div className="videoCardThumbnail">
                {thumbnail
                    ? <img src={thumbnail} alt="video" />
                    : <div className="videoCardPlaceholder" />
                }
                <div className="videoCardOverlay">
                    <span className="videoCardPlay">▶</span>
                    {views !== undefined && (
                        <span className="videoCardViews">{views.toLocaleString()} views</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard