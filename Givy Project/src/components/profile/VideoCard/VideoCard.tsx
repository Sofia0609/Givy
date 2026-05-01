interface VideoCardProps {
    title?: string
    author?: string
    description?: string
    thumbnail?: string
    views?: number
}

function VideoCard({ title, author, description, thumbnail, views }: VideoCardProps) {
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
                {description && <p className="videoCardDescription">{description}</p>}
                {views !== undefined && <span className="videoCardViews">{views} views</span>}
            </div>
        </div>
    )
}

export default VideoCard