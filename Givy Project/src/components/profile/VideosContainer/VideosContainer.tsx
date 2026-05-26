import VideoCard from '../VideoCard/VideoCard'
import './VideosContainer.css'

interface Video {
    
  
    id: string,
    userId: string,
    matchId: string | null,
    url: string,
    thumbnail: string,
    title: string,
    description: string,
    tags: string[],
    likes: number,
    uploadDate: string,
    teaches: string[],
    wantsToLearnInReturn: string[]
}

interface VideosContainerProps {
    videos?: Video[]
}

function VideosContainer({ videos  }: VideosContainerProps) {
    return (
        <div className="profileVideosContainer">
            <div className="profileVideosHeader">
                <span className="profileVideosIcon">⊞</span>
                <span className="profileVideosTitle">VIDEOS</span>
            </div>
            <div className="profileVideosGrid">
                {videos?.map((video) => (
                    <VideoCard
                        key={video.id}
                        videourl={video.url}
                        videoId={video.id}
                    />
                ))
                
                }
            </div>
        </div>
    )
}

export default VideosContainer