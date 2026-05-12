import { useSearchParams } from 'react-router'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import VideoCard from '../../components/search/videoCard/VideoCard'
import videosData from '../../data/videos.json'
import usersData from '../../data/users.json'
import tags from '../../data/tags.json'
import './SearchResults.css'
import arrowLeft from '../../assets/arrow-left.svg'


function SearchResults() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q')?.toLowerCase() || ''
    const tagId = searchParams.get('tag') || ''

    // Obtener usuario logueado
    const loggedData = localStorage.getItem('loggeduser')
    let loggedUser = loggedData ? JSON.parse(loggedData) : null
    
    if (!loggedUser) {
        const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
        loggedUser = storedUsers.find((u: any) => u.id === loggedData?.id)
    }

    const myInterests = loggedUser?.wantsToLearn || []

    // Obtener videos 
    const stored = localStorage.getItem('videos')
    const allVideos = stored ? JSON.parse(stored) : videosData

    // FILTRADO: Solo mostrar videos que enseñan lo que el usuario quiere aprender
    const filtered = allVideos.filter((video: any) => {
        // FILTRO FUNDAMENTAL: el video DEBE enseñar algo que el usuario quiere aprender
        const teachesWhatIWant = video.teaches.some((tId: string) => myInterests.includes(tId))
        
        if (!teachesWhatIWant) return false

        // Si no hay búsqueda específica, mostrar todos los que pasan el filtro
        if (!tagId && !query) return true

        // Si hay búsqueda por tag
        if (tagId) {
            // El tag debe estar en los que el usuario quiere aprender
            if (!myInterests.includes(tagId)) return false
            // Y el video debe enseñar ese tag
            return video.teaches.includes(tagId)
        }

        // Si hay búsqueda por texto
        if (query) {
            const videoOwner = usersData.find(u => u.id === video.userId)
            
            const normalize = (str: string) =>
                str.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')

            const q = normalize(query)

            // Tags que coinciden CON la búsqueda Y están en wantsToLearn
            const matchesTag = tags.some(tag =>
                normalize(tag.name).includes(q) &&
                video.teaches.includes(tag.id) &&
                myInterests.includes(tag.id)
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
        let user = usersData.find(u => u.id === userId)
        if (!user) {
            const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
            user = storedUsers.find((u: any) => u.id === userId)
        }
        return user
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
                    {filtered.map((video: any) => {
                        const user = getUserById(video.userId)
                        return (
                            <div 
                                key={video.id}
                                onClick={() => navigate(`/Feed/${video.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <VideoCard
                                    thumbnail={video.thumbnail}
                                    title={video.title}
                                    userPhoto={user?.profilePicture || ''}
                                    username={user?.username || ''}
                                />
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default SearchResults