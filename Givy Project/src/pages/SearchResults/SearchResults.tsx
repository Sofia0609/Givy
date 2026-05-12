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


    const loggedData = localStorage.getItem('loggeduser')
    const loggedUser = loggedData ? JSON.parse(loggedData) : null
    const myInterests = loggedUser?.wantsToLearn || []

    const filtered = videos.filter(video => {
        

        const teachesWhatIWant = video.teaches.some(tId => myInterests.includes(tId))
        
        if (!teachesWhatIWant) return false

        
        if (tagId) {
            return video.teaches.includes(tagId) ||
                video.wantsToLearnInReturn.includes(tagId)
        }
        if (query) {
            const videoOwner = users.find(u => u.id === video.userId)
            
            const normalize = (str: string) =>
                str.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')

            const q = normalize(query)

            const matchesTag = tags.some(tag =>
                normalize(tag.name).includes(q) &&
                (video.teaches.includes(tag.id) || video.wantsToLearnInReturn.includes(tag.id))
            )

            return (
                normalize(video.title).includes(q) ||
                normalize(video.description).includes(q) ||
                normalize(videoOwner?.username || '').includes(q) ||
                normalize(videoOwner?.at || '').includes(q) ||
                matchesTag
            )
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
                        <img src={arrowLeft} alt="Back" />
                    </button>
                    <SearchBar
                        placeholder={searchLabel}
                        onChange={() => {}}
                        onSearch={(q) => navigate(`/Search/Results?q=${encodeURIComponent(q)}`)}
                    />
                </div>

                <div className="videosGrid">
                    {filtered.length === 0 && <p className="noResults">No results found for your interests</p>}
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