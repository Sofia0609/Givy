import VideoCard from '../VideoCard/VideoCard'
import './VideosContainer.css'

interface Video {
    id: number
    views: number
    thumbnail?: string
}

interface VideosContainerProps {
    videos?: Video[]
}

const placeholderVideos: Video[] = [
    { id: 1, views: 1240 },
    { id: 2, views: 856 },
    { id: 3, views: 3421 },
    { id: 4, views: 512 },
]

function VideosContainer({ videos = placeholderVideos }: VideosContainerProps) {
    return (
        <div className="videosContainer">
            <div className="videosHeader">
                <span className="videosIcon">⊞</span>
                <span className="videosTitle">VIDEOS</span>
            </div>
            <div className="videosGrid">
                {videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        views={video.views}
                        thumbnail={video.thumbnail}
                    />
                ))}
            </div>
        </div>
    )
}

export default VideosContainer