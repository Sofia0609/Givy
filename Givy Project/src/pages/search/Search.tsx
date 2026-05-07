import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import CategoryChip from '../../components/search/categoryChip/CategoryChip'
import HistoryItem from '../../components/search/historyItem/HistoryItem'
import RecommendedItem from '../../components/search/recommendedItem/RecommendedItem'
import tags from '../../data/tags.json' 
import './Search.css'

const RECOMMENDED = [
    "Derivatives explained easily",
    "Salsa dancing for beginners",
    "React hooks explained",
    "How to draw portraits"
]

function Search() {
    const navigate = useNavigate()
    const [history, setHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('searchHistory')
        return saved ? JSON.parse(saved) : []
    })
    const [showAll, setShowAll] = useState(false)

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
                    <CategoryChip label="Math" onClick={() => handleChip('t1')} />
                    <CategoryChip label="Art" onClick={() => handleChip('t2')} />
                    <CategoryChip label="Music" onClick={() => handleChip('t3')} />
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
                    {RECOMMENDED.map((item, i) => (
                        <RecommendedItem
                            key={i}
                            title={item}
                            onClick={() => handleSearch(item)}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}

export default Search