import NavBar from '../../components/navBar/navBar'
import SearchBar from '../../components/search/searchBar/SearchBar'
import CategoryChip from '../../components/search/categoryChip/CategoryChip'
import HistoryItem from '../../components/search/historyItem/HistoryItem'
import RecommendedItem from '../../components/search/recommendedItem/RecommendedItem'
import './Search.css'

function Search() {
    return (
        <>
            <NavBar />
            <div className="searchScreen">

                <div className="searchHeader">
                    <span></span>
                    <button className="closeButton">✕</button>
                </div>
                <SearchBar placeholder="Search" onChange={() => {}} />

                <div className="categories">
                    <CategoryChip label="Science" onClick={() => {}} />
                    <CategoryChip label="Maths" onClick={() => {}} />
                    <CategoryChip label="Design" onClick={() => {}} />
                </div>

                <div className="history">
                    <HistoryItem text="How to play Piano" onDelete={() => {}} />
                    <HistoryItem text="How to speak English like a Native" onDelete={() => {}} />
                    <HistoryItem text="Singing Teniques" onDelete={() => {}} />
                </div>

                <div className="seeMoreContainer">
                    <hr className="seeMoreLine" />
                    <span className="seeMore">See More ▾</span>
                    <hr className="seeMoreLine" />
                </div>

                <h3 className="recommendedTitle">Recommended</h3>
                <div className="recommendedList">
                    <RecommendedItem title="Avanced Math" onClick={() => {}} />
                    <RecommendedItem title="How to speak Japanese" onClick={() => {}} />
                    <RecommendedItem title="Tips for Singing" onClick={() => {}} />
                    <RecommendedItem title="Play guitar" onClick={() => {}} />
                </div>

            </div>
        </>
    )
}

export default Search