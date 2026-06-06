import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import CategoryChip from '../../components/search/categoryChip/CategoryChip'
import HistoryItem from '../../components/search/historyItem/HistoryItem'
import RecommendedItem from '../../components/search/recommendedItem/RecommendedItem'
import tags from '../../data/tags.json'
import './Search.css'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/index'
import { getAllVideos } from '../../services/videoService'
import type { Video } from '../../types/index'

function Search() {
    const navigate = useNavigate()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const [history, setHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('searchHistory')
        return saved ? JSON.parse(saved) : []
    })
    const [showAll, setShowAll] = useState(false)
    const [userChips, setUserChips] = useState<{ id: string, name: string }[]>([])
    const [recommended, setRecommended] = useState<{ id: string, title: string }[]>([])

    useEffect(() => {
        if (!currentUser) return

        const wantsToLearn: string[] = Array.isArray(currentUser.wantsToLearn)
            ? currentUser.wantsToLearn
            : (currentUser.wantsToLearn as string).split(',').filter(Boolean)

        Promise.resolve().then(() => {
            const chips = wantsToLearn
                .slice(0, 3)
                .map((tagId: string) => tags.find(t => t.id === tagId))
                .filter(Boolean) as { id: string, name: string }[]
            setUserChips(chips)
        })

        getAllVideos().then((allVideos: Video[]) => {
            const rec = allVideos
                .filter(v => {
                    const teaches: string[] = Array.isArray(v.teaches)
                        ? v.teaches
                        : (v.teaches as string ?? '').split(',').filter(Boolean)
                    return teaches.some(t => wantsToLearn.includes(t))
                })
                .slice(0, 4)
                .map(v => ({ id: v.id, title: v.description || 'Untitled' }))
            setRecommended(rec)
        })

    }, [currentUser])

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