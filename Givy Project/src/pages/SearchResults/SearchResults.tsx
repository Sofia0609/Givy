import { useSearchParams } from 'react-router'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import VideoCard from '../../components/search/videoCard/VideoCard'
import videos from '../../data/videos.json'
import users from '../../data/users.json'
import tags from '../../data/tags.json'
import './SearchResults.css'
import arrowLeft from '../../assets/arrow-left.svg'

function SearchResults() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q')?.toLowerCase() || ''
    const tagId = searchParams.get('tag') || ''

    const filtered = videos.filter(video => {
        if (tagId) {
            return video.teaches.includes(tagId) || video.wantsToLearnInReturn.includes(tagId)
        }
        if (query) {
            return video.title.toLowerCase().includes(query) ||
                   video.description.toLowerCase().includes(query)
        }
        return true
    })

    const searchLabel = tagId
        ? tags.find(t => t.id === tagId)?.name || ''
        : query

    const getUserById = (userId: string) => {
        return users.find(u => u.id === userId)
    }

    return (
        <>
            <NavBar />
            <div className="resultsScreen">

                <div className="resultsHeader">
                    <button className="backButton" onClick={() => navigate('/Search')}> 
                        <img src={arrowLeft} alt="back" />
                    </button>
                    <SearchBar
                        placeholder={searchLabel}
                        onChange={() => {}}
                    />
                </div>

                <div className="videosGrid">
                    {filtered.length === 0 && <p className="noResults">No results found</p>}
                    {filtered.map(video => {
                        const user = getUserById(video.userId)
                        return (
                            <VideoCard
                                key={video.id}
                                thumbnail={video.thumbnail}
                                title={video.title}
                                userPhoto={user?.profilePicture || ''}
                                username={user?.username || ''}
                            />
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default SearchResults