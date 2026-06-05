import { useSearchParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import VideoCard from '../../components/search/videoCard/VideoCard'
import tags from '../../data/tags.json'
import './SearchResults.css'
import arrowLeft from '../../assets/arrow-left.svg'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/index'
import { getAllVideos } from '../../services/videoService'
import { getAllUsers } from '../../services/userService'
import type { Video, User } from '../../types/index'

function SearchResults() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const query = searchParams.get('q')?.toLowerCase() || ''
    const tagId = searchParams.get('tag') || ''

    const [allVideos, setAllVideos] = useState<Video[]>([])
    const [allUsers, setAllUsers] = useState<User[]>([])

    useEffect(() => {
        getAllVideos().then(setAllVideos)
        getAllUsers().then(setAllUsers)
    }, [])

    const myInterests: string[] = Array.isArray(currentUser?.wantsToLearn)
        ? currentUser.wantsToLearn
        : (currentUser?.wantsToLearn as unknown as string ?? '').split(',').filter(Boolean)

    const filtered = allVideos.filter((video: Video) => {
        const teaches: string[] = Array.isArray(video.teaches)
            ? video.teaches
            : (video.teaches as string).split(',').filter(Boolean)

        const teachesWhatIWant = teaches.some((tId: string) => myInterests.includes(tId))
        if (!teachesWhatIWant) return false
        if (!tagId && !query) return true

        if (tagId) {
            if (!myInterests.includes(tagId)) return false
            return teaches.includes(tagId)
        }

        if (query) {
            const videoOwner = allUsers.find(u => u.id === video.userId)

            const normalize = (str: string) =>
                str.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')

            const q = normalize(query)

            const matchesTag = (tags as { id: string, name: string }[]).some(tag =>
                normalize(tag.name).includes(q) &&
                teaches.includes(tag.id) &&
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
        ? (tags as { id: string, name: string }[]).find(t => t.id === tagId)?.name || ''
        : query

    const getUserById = (userId: string): User | undefined =>
        allUsers.find(u => u.id === userId)

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
                    {filtered.map((video: Video) => {
                        const user = getUserById(video.userId)
                        return (
                            <div
                                key={video.id}
                                onClick={() => navigate(`/Feed/${video.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <VideoCard
                                    thumbnail={video.url}
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