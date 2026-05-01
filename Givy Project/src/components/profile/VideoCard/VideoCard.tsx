interface VideoCardProps {
    title?: string
    author?: string
    thumbnail?: string
    views?: number
}

function VideoCard({ title, author, thumbnail, views }: VideoCardProps) {
    return (
        <div className="videoCard">
            <div className="videoCardThumbnail">
                {thumbnail
                    ? <img src={thumbnail} alt={title} />
                    : <div className="videoCardPlaceholder" />
                }
            </div>
            <div className="videoCardInfo">
                {title && <span className="videoCardTitle">{title}</span>}
                {author && <span className="videoCardAuthor">{author}</span>}
                {views !== undefined && <span className="videoCardViews">{views} views</span>}
            </div>
        </div>
    )
}

export default VideoCard