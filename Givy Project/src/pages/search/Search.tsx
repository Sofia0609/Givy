import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import CategoryChip from '../../components/search/categoryChip/CategoryChip'
import HistoryItem from '../../components/search/historyItem/HistoryItem'
import RecommendedItem from '../../components/search/recommendedItem/RecommendedItem'
import usersData from '../../data/users.json'
import tags from '../../data/tags.json'
import videosData from '../../data/videos.json'
import './Search.css'

function Search() {
    const navigate = useNavigate()

    const loggedData = localStorage.getItem('loggeduser')
    const userLoggedId = loggedData ? JSON.parse(loggedData).id : null

    const [history, setHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('searchHistory')
        return saved ? JSON.parse(saved) : []
    })
    const [showAll, setShowAll] = useState(false)
    const [userChips, setUserChips] = useState<{ id: string, name: string }[]>([])
    const [recommended, setRecommended] = useState<{ id: string, title: string }[]>([])

    useEffect(() => {
        // Buscar usuario en JSON primero
        let user = usersData.find(u => u.id === userLoggedId)
        
        // Si no está en JSON, buscar en localStorage
        if (!user) {
            const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
            user = storedUsers.find(u => u.id === userLoggedId)
        }

        // Categorías: primeros 3 tags que el usuario quiere aprender
        if (user && user.wantsToLearn) {
            const chips = user.wantsToLearn
                .slice(0, 3)
                .map((tagId: string) => tags.find(t => t.id === tagId))
                .filter(Boolean) as { id: string, name: string }[]
            setUserChips(chips)
        }

        if (user && user.wantsToLearn) {
            const stored = localStorage.getItem('videos')
            const allVideos = stored ? JSON.parse(stored) : videosData
            
            const rec = allVideos
                .filter((v: any) => v.teaches.some((t: string) => user.wantsToLearn.includes(t)))
                .slice(0, 4)
                .map((v: any) => ({ id: v.id, title: v.title }))  
            setRecommended(rec)
        }

    }, [userLoggedId])

    const handleSearch = (query: string) => {
        if (!query.trim()) return
        const newHistory = [query, ...history.filter(h => h !== query)]
        setHistory(newHistory)
        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
        navigate(`/Search/Results?q=${encodeURIComponent(query)}`)  
    }

    const handleDelete = (item: string) => {
        const newHistory = history.filter(h => h !== item)
        setHistory(newHistory)
        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    }

    const handleChip = (tagId: string) => {
        navigate(`/Search/Results?tag=${tagId}`)  
    }

    const visibleHistory = showAll ? history : history.slice(0, 3)

    return (
        <>
            <NavBar />
            <div className="searchScreen">

                <div className="searchHeader">
                    <span></span>
                    <button className="closeButton">✕</button>
                </div>

                <SearchBar
                    placeholder="Search"
                    onChange={() => {}}
                    onSearch={handleSearch}
                />

                <div className="categories">
                    {userChips.map(tag => (
                        <CategoryChip
                            key={tag.id}
                            label={tag.name}
                            onClick={() => handleChip(tag.id)}
                        />
                    ))}
                </div>

                {history.length > 0 && (
                    <div className="history">
                        {visibleHistory.map((item, i) => (
                            <HistoryItem
                                key={i}
                                text={item}
                                onDelete={() => handleDelete(item)}
                                onClick={() => handleSearch(item)}
                            />
                        ))}
                    </div>
                )}

                {history.length > 3 && (
                    <div className="seeMoreContainer">
                        <hr className="seeMoreLine" />
                        <span className="seeMore" onClick={() => setShowAll(!showAll)}>
                            {showAll ? 'See Less ▴' : 'See More ▾'}
                        </span>
                        <hr className="seeMoreLine" />
                    </div>
                )}

                <h3 className="recommendedTitle">Recommended</h3>
                <div className="recommendedList">
                    {recommended.map((item) => (
                        <RecommendedItem
                            key={item.id}
                            title={item.title}
                            videoId={item.id}
                            onClick={() => navigate(`/Feed/${item.id}`)}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}

export default Search